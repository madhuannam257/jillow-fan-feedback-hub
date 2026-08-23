# JILLOW CLUB Reviews

JILLOW CLUB Customer Review Website

Build a premium, modern customer review website for my jersey brand JILLOW CLUB.

This website is primarily a customer review/feedback page, not an e-commerce website. The main purpose is to allow customers to submit a review about their JILLOW CLUB jersey and have the submitted review sent to our business email.

BRANDING

Use the JILLOW CLUB logo that I uploaded throughout the website.

Do not recreate, redraw, or replace the logo with text. Use the uploaded logo asset.

Brand colors:

Primary red: bold sportswear red

Black: deep black

White: clean white

Small amounts of grey for secondary text

The overall visual identity should feel:

Premium

Sporty

Modern

Bold

Streetwear-inspired

Professional

Avoid making it look like a generic corporate feedback form.

PAGE STRUCTURE

Create a single-page website focused on reviews.

1. HEADER

Create a black navigation bar.

Left:

JILLOW CLUB logo

Navigation:

REVIEW

ABOUT US

CONTACT

Since this website is for a single review page, the navigation item must say exactly:

REVIEW

Do NOT use "REVIEWS".

Right:

Instagram icon

Red button: SHOP OUR JERSEYS

Keep the header clean and responsive on mobile.

2. MAIN REVIEW SECTION

Create a two-column desktop layout.

LEFT SIDE — REVIEW FORM

Use a large white rounded card against a dark background.

At the top:

REVIEW

Below it:

"Loved your jersey? We'd love to hear from you!"

Then:

"Your feedback helps JILLOW CLUB grow and serve you better."

Include a subtle red decorative element matching the brand.

FORM FIELDS

Customer Name

Label:
YOUR NAME*

Placeholder:
"Enter your name"

Required.

Jersey / Product

Label:
JERSEY / PRODUCT*

Placeholder:
"e.g. Barcelona Home Jersey"

Required.

Rating

Label:
RATING*

Create an interactive 1–5 star rating component.

The stars should:

Be clickable

Highlight when selected

Have a smooth hover interaction

Clearly show the selected rating

Required.

How Did You Hear About Us?

Label:

HOW DID YOU HEAR ABOUT US?*

This must be a text input/text field where the customer can type their own answer.

Do NOT make this a dropdown.

Placeholder:

"Tell us how you got to know about JILLOW CLUB"

Required.

Review

Label:

YOUR REVIEW*

Create a large textarea.

Placeholder:

"Share your experience with the product, quality, fit, delivery, etc."

Required.

Upload Photo

Label:

UPLOAD PHOTO (OPTIONAL)

Allow the customer to upload an image of themselves wearing the jersey or their jersey.

Accept:

JPG

JPEG

PNG

Maximum file size: 5 MB.

This field must be optional.

Email

Label:

YOUR EMAIL (OPTIONAL)

Placeholder:
"Enter your email"

This is optional.

SUBMIT BUTTON

Create a large full-width red button:

SUBMIT REVIEW

Include a small submit/paper-plane icon.

The button should have a subtle hover animation.

3. RIGHT SIDE — BRAND MESSAGE

Create a visually dramatic dark section.

Use the heading:

REAL PEOPLE.

REAL REVIEWS.

REAL IMPACT.

Use white and JILLOW red typography to create a strong sportswear aesthetic.

Below it:

"We don’t just sell jerseys, we build a community. Your feedback fuels our passion. Thank you for being part of the JILLOW CLUB family!"

Add two JILLOW CLUB jersey visuals.

The two jerseys should be:

One black jersey with number 7

One red jersey with number 16

Make sure the numbers are clearly visible and exactly 7 and 16.

Use the JILLOW CLUB branding on the jerseys where appropriate.

4. BENEFITS STRIP

Below the main review section, create a full-width red strip with four sections:

PREMIUM QUALITY
"Top notch quality in every stitch."

FAST DELIVERY
"Quick and reliable shipping."

EASY RETURNS
"Hassle-free returns within 7 days."

CUSTOMER FIRST
"We're here for you, always."

Use simple line icons.

Keep this section visually clean and compact.

5. FOOTER

Create a black footer.

Left:

JILLOW CLUB logo

"Premium jerseys for real fans."

"Designed with passion."

"Delivered with pride."

Add Instagram, WhatsApp and email icons.

Second column:

QUICK LINKS

Review

About Us

Contact

Third column:

SUPPORT

FAQs

Shipping Policy

Returns & Exchanges

Contact Us

Fourth column:

STAY CONNECTED

Text:
"Join our community and be the first to know about new drops and exclusive offers."

Add an email input and a red submit button.

At the very bottom:

© 2026 JILLOW CLUB. All rights reserved.

Use exactly 2026. Do not use C2026 or ©C2026.

DESIGN REQUIREMENTS

Use a high-quality sportswear/streetwear visual style.

The design should be:

Responsive

Mobile-first

Fast-loading

Clean

Premium

Visually bold

Use subtle animations for:

Buttons

Star rating

Form fields

Navigation hover states

Image transitions

Do not overuse animations.

Use rounded corners, but don't make the website overly soft or playful.

Typography should feel bold and athletic, especially for major headings.

FORM FUNCTIONALITY

The review form must actually work.

When a customer submits the form:

Validate all required fields.

Validate the star rating.

Validate the uploaded image type and size.

Prevent duplicate accidental submissions while the request is processing.

Store the review data securely.

Send the complete review details to my business email.

If a customer uploaded a photo, include/access the uploaded photo with the review notification.

Show a professional success message after submission.

Success message:

THANK YOU FOR YOUR REVIEW!

"Your feedback means a lot to the JILLOW CLUB family."

Add a button allowing the customer to return to the review form.

If submission fails, show a clear error message and allow the customer to try again.

DATABASE

Use Supabase if required.

Create a reviews table containing:

id

customer_name

jersey_product

rating

how_did_you_hear

review

photo_url

email

created_at

Store uploaded review photos securely.

Do not expose private customer information publicly.

EMAIL

Set up the architecture so that every submitted review is sent to the JILLOW CLUB business email.

The email should contain:

JILLOW CLUB — NEW CUSTOMER REVIEW

Customer Name:
Jersey / Product:
Rating:
How Did You Hear About Us:
Review:
Customer Email:
Submission Date:

If a photo was uploaded, include a link to the uploaded photo.

Do not expose the business email address in frontend JavaScript.

Use a secure backend/server-side mechanism or appropriate email integration.

SECURITY

Implement basic protection against:

Spam submissions

Invalid file uploads

Oversized files

Malicious input

Repeated rapid submissions

Never expose API keys or secret credentials in frontend code.

IMPORTANT

Do NOT build:

Shopping cart

Checkout

Product catalogue

Payment system

Customer login

This is primarily a JILLOW CLUB customer review website.

Prioritize the visual design and review submission experience.

Use the uploaded JILLOW CLUB logo as the primary brand asset.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://jillow-fan-feedback-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a04d3d76-d06f-4011-8a78-23f077ce4e81).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
