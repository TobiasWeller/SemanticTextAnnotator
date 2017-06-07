<img src="https://cloud.githubusercontent.com/assets/11618221/26683982/0109a468-46e6-11e7-902e-c851126f082c.png" alt="Semantic Text Annotator" title="Semantic Text Annotator" align="middle" height="200"/>


Semantic Text Annotator
======================

The repository contains the Semantic Text Annotator extension for semantic MediaWiki. The extension provides a plugin for capturing Text Annotations of wiki articles.

Click [here](https://sandbox.semantic-mediawiki.org/wiki/HaloTestEvent) for a Demo.

## Table of content
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Annotator setup](#annotator-setup)
- [Usage](#usage)
    - [Create Annotations](#create-annotations)
    - [Edit Annotations](#edit-annotations)
    - [Delete Annotations](#delete-annotations)
    - [Query Annotations](#query-annotations)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Links](#links)
- [Related Extensions](#related-extensions)

## Prerequisites
* [MediaWiki](http://mediawiki.org) must be installed
* [Semantic MediaWiki](https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki) must be installed
* [PageForms](https://www.mediawiki.org/wiki/Extension:Page_Forms) must be installed


## Installation
* Download and extract the repository
* Place the extracted folder in your extension folder of MediaWiki
* Add the following code at the bottom of your LocalSettings.php:</br>
```wfLoadExtension( 'SemanticTextAnnotator' );```
* To users running MediaWiki 1.24 or earlier: Add the folloding at the bottom of your LocalSettings.php:</br>
```require_once "$IP/extensions/SemanticTextAnnotator/SemanticTextAnnotator.php";```

## Annotator Setup
* Go to Special Pages and Click on *Semantic Text Annotator* under the Group *Annotation*
     * *Remark: Only Users with sysops rights are allowed to access the page.*
* Click on the Install button to setup Semantic Image Annotator and refresh the Special Page
* You can now Link PageForms to Annotation-Categories by using the Table on Special Page</br>
    ![Special Page](https://cloud.githubusercontent.com/assets/11618221/26683983/010cc63e-46e6-11e7-99c6-af79548390df.png)


## Usage

### Create Annotations
* Go to a Wiki Article (In the NameSpace 0)
* On the top appears the *Annotate* Button. Click on it to start the Annotation Mode
* Afterwards you can select a text phrase and click on the popup Button
     * *Remark: If the user has no permission to create/edit pages, then no popup appears.*
* You can enter a Comment to the Annotation and select an Annotation-Category (Linked by using the Special Page)
* A popup appears to enter additional information, based on the selected PageForm
* Click on save to store the annotation</br>
     ![Create Annotations](https://cloud.githubusercontent.com/assets/11618221/26683984/012deda0-46e6-11e7-9294-819a860673ee.png)


### Edit Annotations
* Mouseover an annotation. A popup appears. Click on the Edit button.</br>
    ![Create Annotations](https://cloud.githubusercontent.com/assets/11618221/26683985/012e2a2c-46e6-11e7-965a-79dbddc1392d.png)


### Delete Annotations
* Mouseover an annotation. A popup appears. Click on the Delete button.


### Query Annotations
* The annotations are stored in a structured way.
* Every annotated Wikipage has its own overview page (Annotation:*PAGENAME*) which lists all annotations.
* The following figure shows the query for listing all Pages for a certain Wiki page. </br>
<img src="https://cloud.githubusercontent.com/assets/11618221/26683981/0107dbf6-46e6-11e7-8c94-af9db6303d13.png" alt="Query Annotations" title="Query Annotations" align="center" height="300"/>


## License
The Semantic Text Annotator is currently under the MIT License.


## Acknowledgements
The idea of the Semantic Text Annotator is based on a [previous extension](http://people.aifb.kit.edu/bel/SemanticTextAnnotator.zip) by Oliver Lutzi. For the Semantic Text Annotator is the JS Library [annotator.js](http://annotatorjs.org/) used. This Extension was created for the [Semantic MediaWiki Seminar of the AIFB](http://www.aifb.kit.edu/web/Prüfung/Seminare/WS2015/SMW) in WS17/18.
Thank you to [Karsten Hoffmeyer](https://www.semantic-mediawiki.org/wiki/User:Kghbln) for supporting the extension and provding bug fixes.
## Links

* [MediaWiki Extension Page](https://www.mediawiki.org/wiki/Extension:Semantic_Text_Annotator)
* [AIFB](http://www.aifb.kit.edu/web/Semantic_Text_Annotator)


## Related Extensions
* [Semantic Image Annotator](https://github.com/TobiasWeller/SemanticImageAnnotator/)
* Planned: Semantic Video Annotator
* Planned: Semantic PDF Annotator
