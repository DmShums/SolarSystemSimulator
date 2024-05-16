import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import "./welcome.css";
import info from "../../imgs/info-icon.png";

const Welcome = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="grid h-full place-content-center about-container">
        <button
          onClick={() => setOpen(true)}
          className="rounded px-4 py-2  mt-6 ml-3 text-white transition-colors"
        >
          <img alt="info-icon" src={info} width="40" height="40" />
        </button>
      </div>
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto max-w-2xl space-y-4 text-neutral-400">
          <h2 className="text-4xl text-center font-bold text-neutral-200">
            Genral information about this project
          </h2>
          <p>
            In this project, our primary focus is to explore and compare
            different approaches of how rotations and orientations in 3D space
            can be represented mathematically. In particular, we would like to
            delve into the concept of quaternions/Euler angles and how 3D
            transformations are implemented under the hood.
          </p>
          <p>
            Our main objective was to develop a solar system simulation
            employing advanced rotation techniques as discussed earlier.
            Leveraging Three.js, we crafted a sophisticated visualization of our
            three-dimensional space.
          </p>
          <p>
            This website gives you opportunity to immerse yourself in an
            interactive solar system simulation that accurately represents both
            scale and parameters. Dive into our virtual cosmos to explore
            detailed information about each celestial body, from the majestic
            gas giants to the rocky terrain of inner planets.
          </p>
          <p>
            But that's not all — our platform offers an exciting opportunity for
            creativity. With the ability to upload your own models, you can
            design and construct your very own planetary systems. Whether you're
            envisioning a bustling galaxy teeming with celestial bodies or a
            minimalist arrangement of orbits, the power is in your hands to
            bring your astronomical dreams to life.
          </p>
        </div>
      </DragCloseDrawer>
    </>
  );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-neutral-900"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Welcome;
