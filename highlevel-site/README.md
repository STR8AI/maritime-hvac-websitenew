# HighLevel Site Export

This folder holds copy/paste assets for a HighLevel site build. Paste CSS once into the HighLevel global styles area, then drop the partials/pages into their respective custom HTML sections.

Structure
- 00-global: shared variables and global CSS.
- 01-partials: header/footer HTML and optional JS.
- 02-pages: page-level HTML shells.
- 03-forms: HTML wrappers that embed HighLevel-hosted forms.
- 04-assets: place images/icons/fonts used by the pasted HTML/CSS.

Notes
- Keep IDs/classes stable so CSS applies in HighLevel. Avoid renaming without updating CSS.
- HighLevel sanitizes some tags/attributes; re-check after paste.
- Replace form embed placeholders with actual HighLevel form/embed snippets.
