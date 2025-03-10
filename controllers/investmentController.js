const File = require("../models/File");
const Investment = require("../models/Investment");
const crypto = require("crypto");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.createInvestment = async (req, res) => {
  try {
    const { productName, amountPerUnit, rate, period } = req.body;

    console.log("Body Data:", req.body);
    console.log("Uploaded Files:", req.files);

    const pictureUrls = req.files.pictures?.map((file) => file.path);
    const videoUrls = req.files?.videos?.map((file) => file.path);


    // Save to database
    const newInvestment = new Investment({
      productName,
      amountPerUnit,
      rate,
      period,
      pictures: pictureUrls,
      videos: videoUrls,
    });

    await newInvestment.save();
    res.status(201).json({ newInvestment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Processes files: Generates hash, checks if the file exists, uploads if needed, and removes duplicates.
 */
async function processFiles(files, resourceType) {
  if (!files || files.length === 0) return [];

  const fileUrls = [];

  for (const file of files) {
    // Check if file already exists in the database

    // Upload to Cloudinary if not already stored
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: resourceType,
    });

    // Save new file to DB
    const newFile = new File({ hash: fileHash, url: result.secure_url });
    await newFile.save();
    fileUrls.push(result.secure_url);
  }

  return fileUrls;
}

/**
 * Generates a unique SHA-256 hash for a file.
 */
const generateFileHash = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.path) {
      return reject(new Error("Invalid file: Missing path property"));
    }

    // Check if the file is already a URL (Cloudinary link)
    if (file.path.startsWith("http")) {
      console.log(
        "Skipping hash generation for existing Cloudinary URL:",
        file.path
      );
      return resolve(null); // Skip hashing for remote files
    }

    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(file.path);

    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (err) => reject(err));
  });
};

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    // .populate('pictures', 'url') // Populate pictures with URLs
    // .populate('videos', 'url'); // Populate videos with URLs
    console.log("Investments data:", investments);
    res.status(200).json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a single investment by ID
exports.getInvestmentById = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id)
      .populate("pictures", "url") // Populate pictures with URLs
      .populate("videos", "url"); // Populate videos with URLs
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }
    res.status(200).json(investment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//   (async () => {
//     try {
//         // await Investment.deleteMany({});
//       const investments = await Investment.find();
//       console.log("All Investments:", investments);
//     } catch (error) {
//       console.error("Error fetching investments:", error.message);
//     }
//   })();
