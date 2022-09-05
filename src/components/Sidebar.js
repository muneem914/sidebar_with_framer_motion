import React from "react";
import {AnimatePresence, motion } from "framer-motion";

import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({children}) => {


    const routes = [
        {
          path: "/",
          name: "Dashboard",
          icon: <FaHome />,
        },
        {
          path: "/users",
          name: "Users",
          icon: <FaUser />,
        },
        {
          path: "/messages",
          name: "Messages",
          icon: <MdMessage />,
        },
        {
          path: "/analytics",
          name: "Analytics",
          icon: <BiAnalyse />,
        },
        {
          path: "/file-manager",
          name: "File Manager",
          icon: <AiTwotoneFileExclamation />,
          subRoutes: [
            {
              path: "/settings/profile",
              name: "Profile ",
              icon: <FaUser />,
            },
            {
              path: "/settings/2fa",
              name: "2FA",
              icon: <FaLock />,
            },
            {
              path: "/settings/billing",
              name: "Billing",
              icon: <FaMoneyBill />,
            },
          ],
        },
        {
          path: "/order",
          name: "Order",
          icon: <BsCartCheck />,
        },
        {
          path: "/settings",
          name: "Settings",
          icon: <BiCog />,
          exact: true,
          subRoutes: [
            {
              path: "/settings/profile",
              name: "Profile ",
              icon: <FaUser />,
            },
            {
              path: "/settings/2fa",
              name: "2FA",
              icon: <FaLock />,
            },
            {
              path: "/settings/billing",
              name: "Billing",
              icon: <FaMoneyBill />,
            },
          ],
        },
        {
          path: "/saved",
          name: "Saved",
          icon: <AiFillHeart />,
        },
      ];

      const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        },
        show: {
            width: '140px',
            padding: '5px 15px',
            opacity: 1,
            transition: {
                duration: 0.2
            },
        }
      }

      const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        },
        show:{
            width: 'auto',
            opacity: 1,
            transition: {
                duration: 0.2
            }
        }
      }

      const [isOpen, setIsOpen]=useState(false);
      const toggle = () => setIsOpen(!isOpen)

  return (
    <>
            <div className="mainContainer">
      <motion.div animate={{ width: isOpen? "200px" : '40px' }} className="sidebar">
        <div className="topSection">
            {/* <h1 className="logo">Strategic</h1> */}
            {isOpen && <motion.h1 variants={showAnimation} initial="hidden" animate='show' exit="hidden" className="logo">Strategic</motion.h1>}
            <div className="bars"><FaBars onClick={toggle} /></div>
        </div>
        <div className="search">
            <div className="searchIcon"><BiSearch/></div>
            {/* <input placeholder="search"/> */}
            <AnimatePresence>
                {isOpen && <motion.input variants={inputAnimation} initial="hidden" animate="show" exit="hidden" placeholder="search"/>}
            </AnimatePresence>
        </div>
        <section className="routes">
            {routes.map((route, indx) => (
                <NavLink activeClsssName="active" to={route.path} key={route.name} className='link'>
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                    {isOpen && <motion.div variants={showAnimation} initial="hidden" animate='show' exit="hidden" className="linkText">{route.name}</motion.div>}
                    </AnimatePresence>
                </NavLink>
            ))}
        </section>
      </motion.div>
      <main>
        {children}
      </main>
    </div>
    </>
  );
};

export default Sidebar;
