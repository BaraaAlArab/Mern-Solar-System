import Feature from "../models/Feature";

export const addFeatureImage = async (req, res) => {
  try {
    const {image} = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message:
        "An internal server error occurred while adding the feature image.!",
    });
  }
};

export const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message:
        "An internal server error occurred while fetching feature images.!",
    });
  }
};

export const deleteFeatureImage = async (req, res) => {
  try {
    const {id} = req.params;

    await Feature.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Feature image deleted successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message:
        "An internal server error occurred while deleting the feature image.",
    });
  }
};
