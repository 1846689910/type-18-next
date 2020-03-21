const Fs = require("fs");
const Path = require("path");

let _landmarks;

/**
 * @description mock fetch data from landmarks.geo.json;
 * @returns {Object[]}
 */
const localMockDataFetch = () => {
  if (!_landmarks) {
    const landmarksJsonPath = Path.resolve("src/data/landmarks.geo.json");
    const content = Fs.readFileSync(landmarksJsonPath, { encoding: "utf8" });
    _landmarks = JSON.parse(content);
  }
  return _landmarks;
};

module.exports = {
  Query: {
    hello: () => "Hello, type-18-next is now boosted by Apollo + GraphQL",
    landmark: ({ id }) => localMockDataFetch().find(x => x.id === id),
    landmarks() {
      const landmarks = localMockDataFetch();
      return landmarks;
    }
  },
  Mutation: {
    createLandmark(parent, { landmark }) {
      const landmarks = localMockDataFetch();
      const nextId =
        Math.max.apply(
          null,
          landmarks.map(x => x.id)
        ) + 1;
      landmark.id = `${nextId}`;
      landmarks.push(landmark);
      return landmark;
    },
    deleteLandmark(parent, { id }) {
      const landmarks = localMockDataFetch();
      const idx = landmarks.findIndex(x => x.id === id);
      if (idx < 0) return null;
      const [deleted] = landmarks.splice(idx, 1);
      return deleted;
    },
    updateLandmark(parent, { id, landmark }) {
      const landmarks = localMockDataFetch();
      const idx = landmarks.findIndex(x => x.id === id);
      if (idx < 0) return null;
      landmarks.splice(idx, 1, landmark);
      return landmark;
    }
  }
};
