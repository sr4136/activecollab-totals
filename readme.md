### ActiveCollab Hours total for the [My Time](https://app.activecollab.com/207970/my-time) page.

This works when you visit the page from a bookmark (or via refresh upon arrival). It recalculates the totals after you use the "New time record" button on the [My Time](https://app.activecollab.com/207970/my-time) page.

*Note*: You must be on the LIST view of the [My Time](https://app.activecollab.com/207970/my-time) page (not the Table view). *See the screenshot below.*

Take a look at the [issues](https://github.com/sr4136/activecollab-totals/issues) for the known issues.

Steps:

1. Install [TamperMonkey](https://www.tampermonkey.net/) (it’s just an extension that lets you run JS on pages) 
1. Go to the [activecollab-totals.js](https://raw.githubusercontent.com/sr4136/activecollab-totals/master/activecollab-totals.js) file and copy the entire content. 
1. Click the TamperMonkey Icon ![TamperMonkey Icon](https://raw.githubusercontent.com/sr4136/activecollab-totals/master/tampermonkey_icon.png) > Create New Script. 
1. Paste into that window and hit ⌘ + S to save the script. 
1. Reload the [page](https://app.activecollab.com/207970/my-time) to see the totals
1. Optional: edit that TamperMonkey file to adjust the CSS colors that you like better.


![Modified ActiveCollab Screenshot](https://raw.githubusercontent.com/sr4136/activecollab-totals/master/screenshot.png)
