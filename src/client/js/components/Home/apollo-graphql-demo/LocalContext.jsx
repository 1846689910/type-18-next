import React, { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const LANDMARKS = gql`
  query Landmark {
    landmarks {
      id
      name
      address
      url
      description
      coordinates
    }
  }
`;

export const HELLO_QUERY = gql`
  {
    hello
  }
`;

export const CREATE_LANDMARK = gql`
  mutation CreateLandmark($landmark: LandmarkInput!) {
    createLandmark(landmark: $landmark) {
      id
      name
      address
      url
      description
      coordinates
    }
  }
`;

export const DELETE_LANDMARK = gql`
  mutation DeleteLandmark($id: ID!) {
    deleteLandmark(id: $id) {
      id
      name
      address
      url
      description
      coordinates
    }
  }
`;

export const UPDATE_LANDMARK = gql`
  mutation UpdateLandmark($id: ID!, $landmark: LandmarkInput!) {
    updateLandmark(id: $id, landmark: $landmark) {
      id
      name
      address
      url
      description
      coordinates
    }
  }
`;

const LocalContext = createContext();
export default LocalContext;

export const LocalProvider = ({ children }) => {
  const { Provider } = LocalContext;
  const [map, setMap] = useState(undefined);
  const [baseLayer, setBaseLayer] = useState(undefined);
  const [markers, setMarkers] = useState([]);
  const [landmarks, setLandmarks] = useState([]);
  const [prevFields, setPrevFields] = useState(undefined);
  const [selectedMarkerOption, setSelectedMarkerOption] = useState(undefined);
  const [showEditor, setShowEditor] = useState(false);
  const { data: landmarksData } = useQuery(LANDMARKS);
  const apolloClient = useApolloClient();
  const { data: greeting } = useQuery(HELLO_QUERY);
  useEffect(() => {
    if (landmarksData) setLandmarks(landmarksData.landmarks);
  }, [landmarksData]);

  const [createLandmark, { data: createLandmarkData }] = useMutation(
    CREATE_LANDMARK, {
      update(cache, { data: { createLandmark } }){
        if (createLandmark) {
          const { landmarks } = cache.readQuery({ query: LANDMARKS });
          const newLandmarks = [...landmarks, createLandmark];
          cache.writeQuery({
            query: LANDMARKS,
            data: { landmarks: newLandmarks }
          });
          setLandmarks(newLandmarks);
        }
      }
    }
  );
  const [updateLandmark, { data: updateLandmarkData }] = useMutation(
    UPDATE_LANDMARK,
    {
      update(cache, { data: { updateLandmark } }) {
        if (updateLandmark) {
          const { landmarks } = cache.readQuery({ query: LANDMARKS });
          const newLandmarks = [...landmarks];
          const idx = landmarks.findIndex(x => x.id === updateLandmark.id);
          newLandmarks.splice(idx, 1, updateLandmark);
          cache.writeQuery({
            query: LANDMARKS,
            data: { landmarks: newLandmarks }
          });
          setLandmarks(newLandmarks);
        }
      }
    }
  );
  const [deleteLandmark, { data: deleteLandmarkData }] = useMutation(
    DELETE_LANDMARK,
    {
      update(cache, { data: { deleteLandmark } }) {
        if (deleteLandmark) {
          const { landmarks } = cache.readQuery({ query: LANDMARKS });
          const newLandmarks = landmarks.filter(
            x => x.id !== deleteLandmark.id
          );
          cache.writeQuery({
            query: LANDMARKS,
            data: { landmarks: newLandmarks }
          });
          setLandmarks(newLandmarks);
        }
      }
    }
  );
  return (
    <Provider
      value={{
        map,
        setMap,
        baseLayer,
        setBaseLayer,
        markers,
        setMarkers,
        landmarks,
        apolloClient,
        greeting,
        selectedMarkerOption,
        setSelectedMarkerOption,
        prevFields,
        setPrevFields,
        showEditor,
        setShowEditor,
        createLandmark,
        createLandmarkData,
        updateLandmark,
        updateLandmarkData,
        deleteLandmark,
        deleteLandmarkData
      }}
    >
      {children}
    </Provider>
  );
};
LocalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};
