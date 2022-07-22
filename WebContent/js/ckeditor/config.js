/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	 config.enterMode = CKEDITOR.ENTER_BR; // <p></p> to <br />
	  config.entities = false;
	  config.basicEntities = false;
	  config.removePlugins = 'link,sourcearea,list,liststyle,find,replace,forms,checkbox,iframe,maximize,justify,'+
	  'a11yhelp,about,bidi,blockquote,panelbutton,justify,smiley,removeformat,flash,image,horizontalrule,language,'+
	  'templates,showblocks,specialchar,colorbutton,div,pastefromword,format';
	  ;
	config.extraPlugins = 'htmlwriter';
	 config.height = '1000px'; 
	
};
