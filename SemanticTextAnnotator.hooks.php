<?php
/**
 * Hooks for Annotator extension
 *
 * @file
 * @ingroup Extensions
 */

class SemanticTextAnnotatorHooks {

	public static function onBeforePageDisplay( OutputPage &$out, Skin &$skin ) {
		if($out->getTitle()->getNamespace() == 0) {		//0 is the Aricle's Namespace
			$out->addModules( 'ext.annotator' );
		}
		return true;
	}

	public static function onCanonicalNamespaces( array &$namespaces ) {
        global $wgNamespacesWithSubpages;

        if ( !defined( 'NS_ANNOTATION' ) ) {
            define( 'NS_ANNOTATION', 248 );
            define( 'NS_ANNOTATION_TALK', 249 );
        }

        $namespaces[NS_ANNOTATION] = 'Annotation';
        $namespaces[NS_ANNOTATION_TALK] = 'Annotation_talk';

        $wgNamespacesWithSubpages[NS_ANNOTATION] = true;

        return true;
    }

    public static function afterInit( ) {
        global $smwgNamespacesWithSemanticLinks;

        if ( !defined( 'NS_ANNOTATION' ) ) {
            define( 'NS_ANNOTATION', 248 );
            define( 'NS_ANNOTATION_TALK', 249 );
        }

        $smwgNamespacesWithSemanticLinks[NS_ANNOTATION] = true;

        // Enable PageForms Namespace for SemanticLinks
        $smwgNamespacesWithSemanticLinks[PF_NS_FORM] = true;

        return true;
    }

    public static function smwInitProperties( ) {
        if ( class_exists( 'SMW\PropertyRegistry' ) ) {
            SMW\PropertyRegistry::getInstance()->registerProperty ( "___SA_FORM_TYPE_PROPERTY", '_txt', "Form Type", true, true );
            SMW\PropertyRegistry::getInstance()->registerProperty ( "___SA_CATEGORY_NAME_PROPERTY", '_txt', "SA Category Name", true, true );
            SMW\PropertyRegistry::getInstance()->registerProperty ( "___SA_CATEGORY_COLOR_PROPERTY", '_txt', "SA Category Color", true, true );
        }
        /*echo ""+SMW\PropertyRegistry::getInstance 	( );
        /*SMW\PropertyRegistry::registerProperty 	($id,
            $typeId,
            $label = false,
            $isVisible = false,
            $isAnnotable = true
        );*/

        return true;
    }


}
