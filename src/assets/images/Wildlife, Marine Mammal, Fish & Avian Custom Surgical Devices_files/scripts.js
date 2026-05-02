(function($){
	"use strict";

	 $('div[data-row-themeton-option]').each(function(){
		var $row = $(this);
		var css = '';
		var arr = JSON.parse($row.attr('data-array'));
		var vc_class = '';
		if ($row.attr('class').indexOf('vc_custom_')>=0) {
			var n = $row.attr('class').indexOf('vc_custom_');
			for (var i=n; i<$row.attr('class').length; i++)
				if ($row.attr('class')[i]!=' ') vc_class = vc_class + $row.attr('class')[i];
				else break;
		}

		if (arr['height']!=undefined) css = css + 'height:' + arr['height'] +';';
		if (arr['custom_css']!=undefined) var css = css + arr['custom_css'];

		if (css != '') $row.attr('style',css);

		var r_class = '';

		if (arr['flex']!=undefined) r_class = arr['flex'] + ' ';
		if (arr['container']!=undefined) r_class = r_class + arr['container'] + ' ';
		if (arr['valignment']!=undefined) r_class = r_class + arr['valignment'] + ' ';
		if (arr['sticky']!=undefined) r_class = r_class + arr['sticky'] + ' ';
		if (arr['custom_class']!=undefined) r_class = r_class + arr['custom_class'] + ' ';
		if (vc_class!='') r_class = r_class + vc_class;
		if (r_class!='') $row.attr('class',r_class);

    });

    $('div[data-column-themeton-option]').each(function(){
		var $column = $(this);
		var css = '';
		var arr = JSON.parse($column.attr('data-array'));
		var vc_class = '';

		if ($column.attr('class').indexOf('vc_custom_')>=0) {
			var n = $column.attr('class').indexOf('vc_custom_');
			for (var i=n; i<$column.attr('class').length; i++)
				if ($column.attr('class')[i]!=' ') vc_class = vc_class + $column.attr('class')[i];
				else break;
		}

		if (arr['height']!=undefined) css = css + 'height:' + arr['height'] +';';
		if (arr['custom_css']!=undefined) var css = css + arr['custom_css'];

		if (css != '') {
			if ($column.attr('style')!=undefined) {
				var vcss = $column.attr('style');
				css = css + vcss;
				$column.attr('style',css);	
			}
			else $column.attr('style',css);
		}

		var c_class = '';

		if ($column.attr('data-column-custom-class')!=undefined) c_class = c_class + $column.attr('data-column-custom-class') + ' ';
		if ($column.attr('data-column-width')!=undefined) c_class = c_class + $column.attr('data-column-width') + ' ';
		if ($column.attr('data-column-alignment')!=undefined) c_class = c_class + $column.attr('data-column-alignment') + ' ';
		if ($column.attr('data-column-text-alignment')!=undefined) c_class = c_class + $column.attr('data-column-text-alignment');
		if ($column.attr('data-column-valignment')!=undefined) c_class = c_class + $column.attr('data-column-valignment');

		if (arr['width']!=undefined) c_class = arr['width'] + ' ';
		if (arr['custom_class']!=undefined) c_class = c_class + arr['custom_class'] + ' ';
		if (arr['text_alignment']!=undefined) c_class = c_class + arr['text_alignment'] + ' ';
		if (arr['alignment']!=undefined) c_class = c_class + arr['alignment'] + ' ';
		if (arr['valignment']!=undefined) c_class = c_class + arr['valignment'] + ' ';

		if (vc_class!='') r_class = r_class + vc_class;
		if (c_class != '') $column.attr('class',c_class);

    });
})(jQuery);