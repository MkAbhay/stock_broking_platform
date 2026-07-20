const multer = require("multer");
const { CustomError } = require("../app/helpers/CustomError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
}); // diskStorage, memoryStorage

const fileFilter = (req, file, cb) => {
  const allowed = req?.fileRestrictions
    ? req?.fileRestrictions
    : [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  else
    return cb(
      new CustomError("Unsupported file type.", 415, "FILE_UPLOAD_FAILED", {
        message: `Supported formats are: ${allowed.map((m) => m.split("/")[1]).join(", ")}`,
      }),
      false,
    );
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB limit

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
