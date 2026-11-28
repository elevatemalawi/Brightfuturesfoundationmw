# BFF website: GitHub testing and news publishing

## Test the website on GitHub
1. Upload the contents of this folder to the GitHub repository (keep the files and folders at the repository root).
2. In GitHub, open **Settings → Pages** and publish from the main branch / root folder.
3. Wait for the Pages deployment, then open the URL shown by GitHub.

## News publishing dashboard (Pages CMS)
The `.pages.yml` file defines the News & Updates collection. Sign in at https://pagescms.org/ using the GitHub account with write access, select the repository, and create/publish news entries. The content collection is configured under `content/news`. The included GitHub Action runs `build_news.py` whenever news JSON changes and rebuilds the index used by the public News page. Enable GitHub Actions for the repository.

Pages CMS is GitHub-based: authorised editors sign in with their GitHub account and publish changes to the repository. GitHub Pages then serves the updated static site. When the site is later moved to Nyasa Cloud, the same static files can be uploaded there; the CMS can continue writing to GitHub, provided the Nyasa Cloud copy is redeployed/synchronised after each update.

## Contact forms
The donation enquiry and volunteer forms use FormSubmit and send to the primary inbox with the other three addresses configured as CC recipients. FormSubmit requires a one-time activation/confirmation from the recipient inbox when first used. Submit a test from the deployed website and confirm delivery to all four inboxes before public launch. If the service's CC behaviour differs for the account, replace this endpoint with a server-side form handler on Nyasa Cloud.

The donation form is only an enquiry form. It does not accept or process payments. A payment gateway must be separately selected, approved and integrated before online donations can be collected.

## Before public launch
- Confirm the three current team photographs are matched to the correct people; add Clement Mlera's and Marry DossI's approved photos when available.
- Supply the official logo file if the text-only brand heading should be replaced with the actual logo.
- Add only approved beneficiary stories and consented images.
- Add official social media URLs and any additional verified contact details.
- Test both forms and confirm all recipients receive submissions.
