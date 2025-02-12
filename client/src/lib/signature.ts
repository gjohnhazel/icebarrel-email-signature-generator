// Remove the self-import since we're defining SignatureData here
export interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  website: string;
  phone: string;
  logo?: string;
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
  instagram: "https://cdn.gifo.wisestamp.com/s/inst/191b1d/48/circle/border.png",
  youtube: "https://cdn.gifo.wisestamp.com/s/yt/191b1d/48/circle/border.png",
  tiktok: "https://cdn.gifo.wisestamp.com/s/tt/191b1d/48/circle/border.png",
  apple: "https://cdn.gifo.wisestamp.com/s/ap/191b1d/48/circle/border.png",
  playstore: "https://cdn.gifo.wisestamp.com/s/gplay/191b1d/48/circle/border.png"
};

export function generateSignatureHTML(data: SignatureData): string {
  const socialIcons = Object.entries(data.enabledIcons)
    .filter(([_, enabled]) => enabled)
    .map(([platform]) => {
      const url = data.socialLinks[platform as keyof typeof data.socialLinks];
      const iconUrl = socialIconUrls[platform as keyof typeof socialIconUrls];
      return `
        <td align="left" style="margin: 0px; padding-right: 6px; text-align: center; padding-top: 0px;">
          <a href="${url}" rel="nofollow noreferrer" target="_blank">
            <img width="24" height="24" src="${iconUrl}" border="0" alt="${platform}" style="float: left; border: none; max-width: 100%; height: auto;">
          </a>
        </td>
      `;
    })
    .join("");

  return `
  <p style="margin: 0 0 8px;">
    <img src="https://cdn.shopify.com/s/files/1/0593/8125/2163/files/signoff.png?v=1739309984" alt="Kind regards," style="width: 150px; height: auto;">
  </p>
    <table style="direction: ltr; border-collapse: collapse;">
      <tr>
        <td style="margin: 0px; font-size: 0px; height: 12px; line-height: 0;"></td>
      </tr>
      <tr>
        <td style="margin: 0px;">
          <table cellpadding="0" cellspacing="0" style="width: 440px;">
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; line-height: 1.15;">
                  <tr>
                    <td style="margin: 0px; vertical-align: top; padding: 0.01px 12px 0.01px 1px; width: 70px; text-align: center;">
                      ${data.logo ? `
                        <a href="https://icebarrel.com/" rel="nofollow noreferrer" target="_blank" style="display: block; font-size: 0.1px;">
                          <img border="0" src="${data.logo}" width="70" alt="logo" style="width: 70px; height: auto; object-fit: contain; border: 0px; display: block;">
                        </a>
                      ` : ''}
                    </td>
                    <td valign="top" style="margin: 0px; padding: 0.01px 0.01px 0.01px 12px; vertical-align: top; border-left: 2px solid rgb(25, 27, 29);">
                      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          <td style="margin: 0px; padding: 0.01px;">
                            <p style="margin: 0.1px; line-height: 17.28px; font-size: 16px;">
                              <span style="font-family: Arial; font-size: 16px; font-weight: bold; color: rgb(25, 27, 29); letter-spacing: 0px; white-space: nowrap;">${data.name}</span><br>
                              <span style="font-family: Arial; font-size: 14px; font-weight: normal; color: rgb(25, 27, 29); white-space: nowrap;">${data.title}, </span>
                              <span style="font-family: Arial; font-size: 14px; color: rgb(25, 27, 29); white-space: nowrap;">${data.company}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                              <tr>
                                <td nowrap="" style="margin: 0px; padding-top: 12px; white-space: nowrap; font-family: Arial;">
                                  <p style="margin: 1px; line-height: 10.89px; font-size: 11px;">
                                    <a href="${data.website}" rel="nofollow noreferrer" target="_blank" style="font-family: Arial; text-decoration: unset;">
                                      <span style="line-height: 13.2px; font-family: Arial; font-size: 11px; color: rgb(25, 27, 29); white-space: nowrap;">www.icebarrel.com</span>
                                    </a>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <a href="mailto:${data.email}" rel="nofollow noreferrer" target="_blank" style="font-family: Arial; text-decoration: unset;">
                                      <span style="line-height: 13.2px; font-family: Arial; font-size: 11px; color: rgb(25, 27, 29); white-space: nowrap;">${data.email}</span>
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="margin: 0px; padding: 12px 0.01px 0.01px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                ${socialIcons}
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="margin: 0px; line-height: 0.01px; padding-top: 16px; font-size: 1px;"></td>
            </tr>
            <tr>
              <td>
                <table cellpadding="0" cellspacing="0" width="100%" style="width: 440px; color: gray; border-top: 1px solid gray; line-height: normal;">
                  <tr>
                    <td style="margin: 0px; padding: 9px 8px 0px 0px;">
                      <p style="color: rgb(136, 136, 136); text-align: left; font-size: 10px; margin: 1px; line-height: 12px; font-family: Arial;">
                        IMPORTANT: The contents of this email and any attachments are confidential. They are intended for the named recipient(s) only. If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or make copies thereof.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export function generateGmailSignatureHTML(data: SignatureData): string {
  const socialIcons = Object.entries(data.enabledIcons)
    .filter(([_, enabled]) => enabled)
    .map(([platform]) => {
      const url = data.socialLinks[platform as keyof typeof data.socialLinks];
      const iconUrl = socialIconUrls[platform as keyof typeof socialIconUrls];
      return `<td style="padding-right: 8px;"><a href="${url}" style="text-decoration: none; display: inline-block;" target="_blank"><img src="${iconUrl}" width="24" height="24" style="border: 0; display: block;" alt="${platform}"></a></td>`;
    })
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #191b1d;">
      <p style="margin: 0 0 8px;">
        <img src="https://cdn.shopify.com/s/files/1/0593/8125/2163/files/signoff.png?v=1739309984" alt="Kind regards," style="width: 150px; height: auto;">
      </p>
      <table style="border-collapse: collapse; margin: 0; padding: 0;">
        <tr>
          <td style="vertical-align: top; padding-right: 12px;">
            ${data.logo ? `<a href="https://icebarrel.com/" style="display: block;" target="_blank">
              <img src="${data.logo}" width="70" style="width: 70px; height: auto; border: 0;" alt="Ice Barrel Logo">
            </a>` : ''}
          </td>
          <td style="vertical-align: top; padding-left: 12px; border-left: 2px solid #191b1d;">
            <div style="margin-bottom: 4px;">
              <strong style="font-size: 16px; color: #191b1d;">${data.name}</strong><br>
              <span style="font-size: 14px; color: #191b1d;">${data.title}${data.title ? ', ' : ''}${data.company}</span>
            </div>
            <div style="margin: 8px 0; font-size: 11px;">
              <a href="${data.website}" style="color: #191b1d; text-decoration: none;" target="_blank">www.icebarrel.com</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="mailto:${data.email}" style="color: #191b1d; text-decoration: none;">${data.email}</a>
            </div>
            <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 8px;">
              <tr>
                ${socialIcons}
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div style="margin-top: 16px; padding-top: 8px; border-top: 1px solid #888; font-size: 10px; color: #888;">
        IMPORTANT: The contents of this email and any attachments are confidential. They are intended for the named recipient(s) only. If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or make copies thereof.
      </div>
    </div>
  `;
}