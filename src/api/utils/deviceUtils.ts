
// Enhanced device info collection
export const getDeviceInfo = () => {
  try {
    return {
      browser: navigator.userAgent,
      os: navigator.platform,
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  } catch (error) {
    console.warn('Could not collect device info:', error);
    return {};
  }
};
