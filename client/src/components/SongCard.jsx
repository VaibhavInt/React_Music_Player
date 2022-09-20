import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbumById,
  deleteArtistById,
  deleteSongById,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

const SongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [{ alertType, allArtists, allAlbums, allSongs }, dispatch] =
    useStateValue();

  const deleteData = (data) => {
    // Delete Song
    const deleteRef = ref(storage, data.imageURL);
    deleteObject(deleteRef).then(() => {});
    deleteSongById(data._id).then((res) => {
      if (res.data) {
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.songs,
          });
        });
      }
    });

    //Album

    deleteAlbumById(data._id).then((res) => {
      if (res.data) {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: data.albums,
          });
        });
      }
    });

    //artist
    deleteArtistById(data._id).then((res) => {
      if (res.data) {
        getAllArtists().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: data.artists,
          });
        });
      }
    });
  };

  return (
    <motion.div className="relative w-40  min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
      <div className="w-40 min-w-[160px] h-60 min-h-[180px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      <p className="text-base text-center  text-headingColor font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
        {data.artist && (
          <span className="block text-sm text-gray-400 my-1">
            {data.artist.length > 25
              ? `${data.artist.slice(0, 25)}..`
              : data.artist}
          </span>
        )}
      </p>

      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          whileTap={{ scale: 0.75 }}
          className="text-lg text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => setIsDelete(true)}
        >
          <IoTrash />
        </motion.i>
      </div>

      {isDelete && (
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center justify-center flex-col px-4 py-2 gap-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Are you sure do you want to delete it?
          </p>

          <div className="flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={deleteData(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer"
              whileTap={{ scale: 0.7 }}
              onClick={() => setIsDelete(false)}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
