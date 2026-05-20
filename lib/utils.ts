import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


/**
 * Combines multiple class values into a single string, merging Tailwind CSS class names where applicable.
 *
 * @param {...ClassValue[]} inputs - One or more class value arguments. These can be strings, arrays, or objects representing class names.
 * @return {string} - A single space-separated string of class names, with merged Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Checks whether a given string is undefined, null, or an empty string.
 *
 * @param {string} value - The string value to evaluate.
 * @return {boolean} Returns true if the value is undefined, null, or an empty string; otherwise, returns false.
 */
export function isEmptyOrNullOrUndefined(value: string): boolean {
    // Check if the value is undefined, null, or an empty string
    return value === undefined || value === null || value === "";
}