import React from 'react';
import styles from '../scss/account-delete.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}

const Checkbox = ({ checked, onChange, children }: CheckboxProps) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className={styles.label}>{children}</span>
    </label>
  );
};

export default Checkbox;
