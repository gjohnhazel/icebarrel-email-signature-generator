
export interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  website: string;
  phone: string;
  logo?: string; // base64 encoded logo
  socialLinks: {
    instagram: string;
    youtube: string;
    tiktok: string;
    apple: string;
    playstore: string;
  };
  enabledIcons: {
    instagram: boolean;
    youtube: boolean;
    tiktok: boolean;
    apple: boolean;
    playstore: boolean;
  };
}

const socialIconUrls = {
  instagram: "https://cdn-icons-png.flaticon.com/512/1384/1384063.png",
  youtube: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  tiktok: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
  apple: "https://cdn-icons-png.flaticon.com/512/831/831276.png",
  playstore: "https://cdn-icons-png.flaticon.com/512/6124/6124997.png"
};

export function generateSignatureHTML(data: SignatureData): string {
  const socialIcons = Object.entries(data.enabledIcons)
    .filter(([_, enabled]) => enabled)
    .map(([platform]) => {
      const url = data.socialLinks[platform as keyof typeof data.socialLinks];
      const iconUrl = socialIconUrls[platform as keyof typeof socialIconUrls];
      return `
        <a href="${url}" style="text-decoration: none; margin-right: 8px;">
          <img src="${iconUrl}" alt="${platform}" style="width: 20px; height: 20px;">
        </a>
      `;
    })
    .join("");

  return `
    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; color: #333333; max-width: 600px;">
      <tr>
        <td style="padding-bottom: 10px;">
          ${data.logo ? `
            <div style="padding-bottom: 10px;">
              <img src="${data.logo}" alt="Company Logo" style="max-width: 200px; max-height: 100px;">
            </div>
          ` : ''}
          <div style="font-size: 18px; font-weight: bold; color: #000;">${data.name}</div>
          <div style="font-size: 14px; color: #666;">${data.title}</div>
          <div style="font-size: 14px; color: #666;">Ice Barrel</div>
        </td>
      </tr>
      <tr>
        <td style="padding-bottom: 10px;">
          ${data.phone ? `<div style="font-size: 14px;">${data.phone}</div>` : ''}
          ${data.email ? `<div style="font-size: 14px;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></div>` : ''}
          <div style="font-size: 14px;"><a href="https://www.icebarrel.com" style="color: #2563eb; text-decoration: none;">www.icebarrel.com</a></div>
        </td>
      </tr>
      ${socialIcons ? `
        <tr>
          <td style="padding-top: 10px; border-top: 1px solid #eee;">
            ${socialIcons}
          </td>
        </tr>
      ` : ''}
    </table>
  `;
}
