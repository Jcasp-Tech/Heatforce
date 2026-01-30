import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../../styles/Pages/Navbar.module.scss';
import AnimatedText from '../theme/effects/AnimatedText';
import Image from 'next/image';
import MaintenancePage from '../MaintenanceComponent/MaintenancePage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const menuItems = ['HOME', 'ABOUT-US', 'FAQ', 'CONTACT-US'];
  const MaintenancePageVal: any = process.env.NEXT_MAINTENANCE_MODE;

  return (
    <header className="headerContainer">
      <div className={`${styles.navbar}`}>
        <div className="cssanimation fadeInBottom">
          <Image
            src="/images/Heatforce-Logo.png"
            alt="Heatforce logo"
            className="navbar-logo"
            width={240}
            height={60}
            onClick={() => (window.location.href = '/')}
          />
        </div>
        {/* Desktop view navigation */}
        <div className="desktop-view">
          <nav className={styles.navbarElements}>
            {menuItems.map((item, index) => (
              <div key={index}>
                <AnimatedText>
                  <Link
                    className={styles.dropdownItem}
                    href={index === 0 ? '/' : `/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </AnimatedText>
              </div>
            ))}
          </nav>
        </div>
        {/* Mobile view navigation */}
        <div className="mobile-view">
          <nav className={styles.mobileNavbar}>
            <motion.button
              className={styles.menuToggle}
              onClick={toggleMenu}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? '✕' : '☰'}
            </motion.button>
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  className={styles.mobileMenuOverlay}
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 0.5 }}
                  // exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={toggleMenu}
                >
                  <motion.div
                    className={styles.dropdownMenu}
                    // initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: '80px' }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'block',
                      position: 'initial',
                      flexBasis: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    {menuItems.map((item) => (
                      <motion.div key={item} style={{ paddingTop: '1rem' }}>
                        <AnimatedText>
                          <Link
                            className={styles.dropdownItem}
                            href={`/${
                              item === 'HOME' ? '/' : item.toLowerCase()
                            }`}
                            onClick={toggleMenu}
                          >
                            {item}
                          </Link>
                        </AnimatedText>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>
      {MaintenancePageVal == 'on' ? <MaintenancePage /> : ''}
    </header>
  );
};

export default Navbar;
