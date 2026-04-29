import Slot from "../model/Slot.js";

// Add a new slot
export const createSlot = async (req, res) => {
    const { teacherEmail, teacherName, date, time } = req.body;

    try {
        if (!teacherEmail || !teacherName || !date || !time) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const startDateTime = new Date(`${date}T${time}`);
        const now = new Date();

        if (startDateTime <= now) {
            return res.status(400).json({ success: false, message: "Cannot add a slot in the past." });
        }

        const endDateTime = new Date(startDateTime.getTime() + 15 * 60 * 1000);

        // Check for overlaps for the same teacher
        const existingSlots = await Slot.find({ teacherEmail });
        const hasOverlap = existingSlots.some((s) => {
            const sStart = new Date(s.startDateTime);
            const sEnd = new Date(s.endDateTime);
            return startDateTime < sEnd && endDateTime > sStart;
        });

        if (hasOverlap) {
            return res.status(400).json({ success: false, message: "This slot overlaps with an existing slot." });
        }

        const newSlot = new Slot({
            teacherEmail,
            teacherName,
            date,
            time,
            startDateTime,
            endDateTime,
        });

        await newSlot.save();

        res.status(201).json({
            success: true,
            message: "Slot created successfully.",
            slot: newSlot
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get all available slots for students
export const getAvailableSlots = async (req, res) => {
    try {
        const slots = await Slot.find({ status: 'available' }).sort({ startDateTime: 1 });
        res.status(200).json({
            success: true,
            slots
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get slots for a specific teacher
export const getTeacherSlots = async (req, res) => {
    const { email } = req.params;
    try {
        const slots = await Slot.find({ teacherEmail: email }).sort({ startDateTime: 1 });
        res.status(200).json({
            success: true,
            slots
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get booked slots for a specific student
export const getStudentBookings = async (req, res) => {
    const { email } = req.params;
    try {
        const slots = await Slot.find({ "bookedBy.email": email }).sort({ startDateTime: 1 });
        res.status(200).json({
            success: true,
            slots
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Book a slot
export const bookSlot = async (req, res) => {
    const { id } = req.params;
    const { studentName, studentEmail } = req.body;

    try {
        const slot = await Slot.findById(id);

        if (!slot) {
            return res.status(404).json({ success: false, message: "Slot not found." });
        }

        if (slot.status === 'booked') {
            return res.status(400).json({ success: false, message: "Slot is already booked." });
        }

        slot.status = 'booked';
        slot.bookedBy = { name: studentName, email: studentEmail };
        
        await slot.save();

        res.status(200).json({
            success: true,
            message: "Slot booked successfully.",
            slot
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a slot
export const deleteSlot = async (req, res) => {
    const { id } = req.params;

    try {
        const slot = await Slot.findById(id);

        if (!slot) {
            return res.status(404).json({ success: false, message: "Slot not found." });
        }

        if (slot.status === 'booked') {
             return res.status(400).json({ success: false, message: "Cannot delete a booked slot." });
        }

        await Slot.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Slot deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
