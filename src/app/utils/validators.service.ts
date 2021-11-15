import {AbstractControl} from '@angular/forms';

export const isNotValidUrl = (control: AbstractControl) => {
  if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { isNotValidUrl: true };
  }
};

export const  isNotValidYear = (control: AbstractControl) => {
  const validNumber = /^-?[\d.]+(?:e-?\d+)?$/;

  if (!validNumber.test(control.value) || !(control.value.length === 4)
  || !(control.value > 1895)) {
    return { isNotValidYear: true };
  }
};

export const  isNotValidDuration = (control: AbstractControl) => {
  const validNumber = /^-?[\d.]+(?:e-?\d+)?$/;

  if (!validNumber.test(control.value) || !(control.value.length === 3)) {
    return { isNotValidDuration: true };
  }
};

export const  isNotValidRating = (control: AbstractControl) => {
  const validNumber = /^-?[\d.]+(?:e-?\d+)?$/;

  if (!validNumber.test(control.value) || !(control.value >= 0.0 && control.value <= 10.0)) {
    return { isNotValidRating: true };
  }
};
