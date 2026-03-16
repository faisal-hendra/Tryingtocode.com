# CONVENTIONS

(if you wish to change anything here, or need clarifications, contact me)

## General

If you see something in the codebase that technically fits
this but isn't stated, then try to keep it up. If you think
it is bad, then request a change.

Anything that says no tabs is wrong. Tabs are ok. 
Don't use spaces when a tab would look fine.
Replace tabs with 4 spaces where neccisary. 

White spaces should usually just be alone.
Two in a row if very important.

If you find any broken rules in the codebase, feel free to fix them.

Don't use special characters or emoji for anything unless strictly neccisary.

## Comits

All commits should keep technical debt low.

Titles should be clear as to what you've added. 
If many minor fixes have been made, in the description of the commit say:
"
Minor Tweaks: 
-file_name
-file_name2
"

## HTML

https://www.w3schools.com/html/html5_syntax.asp

But:
- Avoid comments.
- If making a reusable component, create a custom html component using js customElements.define.

## CSS 

(ONLY CSS, don't worry about the html rules here)
https://cssguidelin.es/

But: 
- don't indent children with tabs, keep everything on the main line or 1 tab out.
- don't use Sass (may change if needed)
- alignment is not neccisary
- keep whitespace to 2 in a row, not the 5 recommended between sections

As opposed to other languages, be plentiful with comments (still within reason though).

## JavaScript

https://www.w3schools.com/js/js_conventions.asp

But:
- always use () => instead of function (if you must use function for [this] functionality, use comments to explain why)
- keep a header at the top with a simple explanation of code (right below exports)
- use tab, not spaces.
- short objects avoided unless 2 or less properties
- use camelCase besides CONST_VARIABLES

WhiteSpace:
- 1 for in between functions, and basic logic sections.
- 2 for in between sections like functions, classes, variables.
- Use sparingly and consistantly.

# Legal

See README NDA and Ownership

# What next

TODO + Read the codebase + Ask instructor