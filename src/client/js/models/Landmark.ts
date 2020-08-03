export default class Landmark {
  name: string;
  coordinates: number[];
  address: string;
  url: string;
  description: string;
  id: string;
  constructor(name: string, coordinates: number[], address: string, url: string, description: string, id: string) {
    this.name = name;
    this.coordinates = coordinates;
    this.address = address;
    this.url = url;
    this.description = description;
    this.id = id;
  }
  /**
   * @param {Object} obj
   * @returns {Landmark}
   */
  static fromObject = (obj: {
    name: string;
    coordinates: number[];
    address: string;
    url: string;
    description: string;
    id: string;
  }): Landmark => {
    const { name, coordinates, address, url, description, id } = obj;
    return new Landmark(name, coordinates, address, url, description, id);
  };
  /**
   * @returns {Object[]}
   */
  toFields = (): {
    label?: string;
    key: string;
    value: string;
  }[] => [
    { label: "Name", key: "name", value: this.name },
    {
      label: "Coordinates",
      key: "coordinates",
      value: this.coordinates.join(","),
    },
    { label: "Address", key: "address", value: this.address },
    {
      label: "Description",
      key: "description",
      value: this.description,
    },
    { label: "Url", key: "url", value: this.url },
    { key: "id", value: this.id },
  ];
}
