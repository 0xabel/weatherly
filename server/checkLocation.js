import got from "got";

class Location {
  async checkLocation(x) {
    const { location } = x;
    try {
      const res = await got(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${process.env.GOOGLE_API_KEY}`
      ).json();

      if (res.status === "OK" && res.results.length > 0) {
        const addressComponents = res.results[0].address_components;
        // Define an array of component types to validate (e.g., locality and administrative_area_level_1)
        const componentTypesToValidate = [
          "locality",
          "administrative_area_level_1",
          "country",
          "continent",
        ];
        const isAddressValid = componentTypesToValidate.some(
          (componentType) => {
            return addressComponents.some((component) =>
              component.types.includes(componentType)
            );
          }
        );

        const foundLocation = addressComponents
          .filter((obj) =>
            obj.types.some((type) => componentTypesToValidate.includes(type))
          )
          .map((obj) => obj.long_name)
          .join(",");

        if (!isAddressValid) {
          return false; // Invalid address
        }

        return foundLocation;
      } else {
        return false; // Invalid address
      }
    } catch (err) {
      return false;
    }
  }
}

export default new Location();
