RANGOLI BY KRUPA — WEBSITE GUIDE

DEPLOY ON NETLIFY
Unzip the website package first. Upload this entire rangoli-by-krupa folder (the folder containing index.html) to Netlify's manual deploy area. No build command or installation is needed. Netlify supplies your live website link after deployment.

ADD CONTACT DETAILS
Open content.js in a plain text editor, such as Notepad. Fill the empty quotation marks for whatsapp, phone, email and instagram. Save the file, then upload the updated website folder to Netlify again.
WhatsApp: country code and number, digits only. Phone: include the country code. Instagram: full https://www.instagram.com/yourname/ address. Leave unused methods empty. Buttons appear only for filled details. Until then the website says contact details will be added soon; it cannot receive enquiries yet.

ADD YOUR ARTWORK PHOTOS
1. Put your photos into images/. Use simple filenames, such as wedding-01.jpg.
2. Resize large images to around 1600 pixels on the longest edge. JPEG or WebP files around 200–400 KB help the gallery load quickly.
3. In content.js, replace artworks: [] with your entries. Example structure (replace all descriptive text with your own):

artworks: [
  { src: "images/wedding-01.jpg", title: "Your artwork title", alt: "Describe what is visible in your artwork", categories: ["Wedding", "Colour powder"] }
]

Separate additional entries with a comma. Available categories are exactly: Colour powder, Festival, Wedding, Corporate. Photos display in the order listed. One artwork may have several categories. The gallery filters and larger image viewer work automatically once entries are added. Only your own photos should be used.

Upload the full updated folder again to publish changes. Editing files only on your computer does not change the live website. You can also return to this chat with your finished photos and request the gallery update.

CONTENT NOTES
No artwork, reviews, customer names or prices have been invented. Contact details are intentionally empty. Travel arrangements have not been described because the supplied wording did not clearly establish whether the artist or client travels.

This is a static website with no enquiry-form service, tracking, account or upload dashboard. Photo and contact changes are made in the files above. Text content is in index.html and colours are in styles.css.
