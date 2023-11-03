'use server';

// system is unusable
import { BadRequestError } from '@/lib/errors';
import { LogLevel, logger } from '@/lib/logs/server';

export async function writeEmerg(data: unknown) {
  return await writeLog('emerg', data);
}

// action must be taken immediately
export async function writeAlert(data: unknown) {
  return await writeLog('alert', data);
}

// critical conditions
export async function writeCrit(data: unknown) {
  return await writeLog('crit', data);
}

// error conditions
export async function writeError(data: unknown) {
  return await writeLog('error', data);
}

// warning conditions
export async function writeWarn(data: unknown) {
  return await writeLog('warn', data);
}

// normal but significant condition
export async function writeNotice(data: unknown) {
  return await writeLog('notice', data);
}

// normal but significant condition
export async function writeInfo(data: unknown) {
  return await writeLog('info', data);
}

// debug-level messages
export async function writeDebug(data: unknown) {
  return await writeLog('debug', data);
}

export async function writeLog(level: LogLevel, data: unknown) {
  try {
    const str = JSON.stringify(data);
    if (str.length > 1024 * 50) {
      return new BadRequestError({
        message: '送信可能なサイズを超過しています。',
      }).toJson();
    }
  } catch (e) {
    return new BadRequestError().toJson();
  }
  logger.log(level, data);
}
