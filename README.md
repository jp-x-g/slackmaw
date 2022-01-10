This is a very simple, very quickly-written GreaseMonkey script that can be used to archive Slack messages from the browser window.

Much like Chylex's Discord History Tracker (a better software in every possible way), it eschews the API entirely, and instead uses JavaScript to fetch message information from the screen display.

Essentially, when this script is enabled, Slack windows will have two additional buttons: "scrape" and "save".

The "scrape" button will activate the archival process: several times per second, the program will scan all visible messages on the screen and add them to an object in memory (checking to avoid adding duplicates). To archive a large number of messages, activate the "scrape" button and start scrolling down the page (no more than one screen at a time). There are some softwares that can do this automatically, but personally, I've found that a AA battery on the Page Down key and a few episodes of JoJo works wonders.

The "save" button will proffer a big-ass text file with all of the lines in it, with timestamps and sender name included for each. If they're out of order (because you scrolled up instead of down, for example) you can use a text editor to sort the lines. I use Sublime Text, myself.
