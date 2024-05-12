import { Locator } from '@playwright/test';
import { TIME_UNITS } from './constants';

export async function checkElementVisibility(
  element: Locator,
  timeout: number = TIME_UNITS.FIVE_SECONDS,
): Promise<boolean> {
  return await element
    .waitFor({ state: 'visible', timeout: timeout })
    .then(() => true)
    .catch(() => false);
}

export function getRandomTestName(): string {
    const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const minLength = 3;
    const maxLength = 255;
    const tableNameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let tableName = '';

    for (let i = 0; i < tableNameLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        tableName += allowedChars[randomIndex];
    }

    return tableName;
}
