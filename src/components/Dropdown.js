import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

import styles from '../styles/components/dropdown.module.css';

const Dropdown = ({ data, title, setDropDown }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <section className={styles.dropdown}>
      <div
        className={styles.dropdownBtn}
        onClick={() => setDropdown(!dropdown)}
      >
        <span>{title}</span>
        {!dropdown ? (
          <ChevronDown strokeWidth={1} className={styles.dropdownIcon} />
        ) : (
          <ChevronUp strokeWidth={1} className={styles.dropdownIcon} />
        )}
      </div>

      <div className={styles.dropdownContent}>
        {dropdown &&
          Object.keys(data)?.map((item, index) => (
            <ul key={index}>
              <li
                className={styles.dropdownItems}
                onClick={() => [
                  setDropdown(!dropdown),
                  setDropDown(data[item]),
                ]}
              >
                {item}
              </li>
            </ul>
          ))}
      </div>
    </section>
  );
};

export default Dropdown;
