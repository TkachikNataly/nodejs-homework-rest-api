const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const setAvatar = async (req, res, next) => {
    try {
        const { path: tempPath, originalname } = req.file;
        const { _id } = req.user;
        const [extention] = originalname.split(".").reverse();
        const newName = `${_id}.${extention}`;
        const uploadPath = path.join(avatarsDir, newName);

        jimp
            .read(tempPath)
            .then((img) => {
                return img.resize(250, 250);
            })
            .catch((err) => {
                console.error(err);
            });
        await fs.rename(tempPath, uploadPath);
        const avatarURL = path.join("avatars", newName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        next(error);
    }


};
module.exports = setAvatar;