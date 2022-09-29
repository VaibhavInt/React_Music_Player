import * as React from "react";
import { motion } from "framer-motion";

export default function ImgMediaCard(songs, index) {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      <motion.div className="relative w-40  min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
        <div className="w-40 min-w-[160px] h-60 min-h-[180px] rounded-lg drop-shadow-lg relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={songs.data.imageURL}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
