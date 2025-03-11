import Notification from '../models/notification.model.js';


export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.userId }).sort({ createdAt: -1 })
        .populate("relatedUser", "name username profilePic")
        .populate("relatedPost", "content image");

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error in getUserNotifications: ", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        const notification = await Notification.findByIdAndUpdate({_id: notificationId, recipient: req.user._id}, { read: true }, { new: true });
        res.json(notification)
    } catch (error) {
        console.error("Error in markNotificationAsRead: ", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteNotification = async (req, res) => {
	const notificationId = req.params.id;

	try {
		await Notification.findOneAndDelete({
			_id: notificationId,
			recipient: req.user._id,
		});

		res.json({ message: "Notification deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};