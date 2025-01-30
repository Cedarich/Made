import { motion } from 'framer-motion';

export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 border-blue-400/20 rounded-full" />
        <motion.div 
          className="absolute inset-0 border-4 border-t-blue-400 border-r-blue-400 border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-purple-400/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-t-purple-400 border-r-transparent border-b-transparent border-l-purple-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
} 