#SemanticAnnotator

This is an Extension for Semantic Media Wiki.

## Installation

Clone this Repository to your MediaWiki extensions folder.

	cd extensions
	git clone https://github.com/DominikMartin/SemanticAnnotator.git

Append the following line to the end of your `LocalSettings.php`

	wfLoadExtension( 'SemanticTextAnnotator' );

Go to Special Page SemanticAnnotator and click the Install Button. After this the Extension is nearly ready to use.
Now you have to create a PageForms Form (first create some Properties and a Template) and connect it to the SemanticTextAnnotator. Therefor you have to go to SemanticAnnotator SpecialPage again. Type in a custom Name and select a Form which will be added.

Now you are able to annotate any type of Wiki content by activating AnnotateMode and selecting some text. Have fun :)

## Code Checking (optional)

This automates the recommended code checkers for PHP and JavaScript code in Wikimedia projects
(see https://www.mediawiki.org/wiki/Continuous_integration/Entry_points).
To take advantage of this automation.
 - install nodejs, npm, and PHP composer
 - change to the extension's directory
 - npm install
 - composer install

Once set up, running `npm test` and `composer test` will run automated code checks.
