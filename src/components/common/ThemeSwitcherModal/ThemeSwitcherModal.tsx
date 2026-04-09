'use client';

import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';

import { THEME_OPTIONS, useTheme } from '@/providers';

import styles from './ThemeSwitcherModal.module.scss';

export const ThemeSwitcherModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        type="button"
        label="Theme Switcher"
        icon="pi pi-palette"
        onClick={() => setIsOpen(true)}
        className={styles.triggerButton}
      />

      <Dialog
        header="Choose Theme"
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        modal
        draggable={false}
        resizable={false}
        style={{ width: 'min(36rem, 90vw)' }}
      >
        <div className={styles.dialogContent}>
          <SelectButton
            value={theme}
            options={THEME_OPTIONS}
            optionLabel="label"
            optionValue="value"
            onChange={(event) => setTheme(event.value)}
          />
        </div>
      </Dialog>
    </>
  );
};
