(function($) {
  CKEDITOR.plugins.add('readmore', {
    init: function(editor) {
        
      editor.ui.addButton('btn_readmore', {
        label: 'Read more',
        command: 'ckeditor_readmore',
        icon: this.path + 'icons/readmore.png',
      });

      var cssPath = this.path + 'readmore.css';
      editor.on('mode', function () {
        if (editor.mode === 'wysiwyg') {
          this.document.appendStyleSheet(cssPath);
        }
      });

      // Prevent nesting by disabling button.
      editor.on('selectionChange', function (evt) {
        if (editor.readOnly) {
          return;
        }
        var command = editor.getCommand('ckeditor_readmore');
        var element = evt.data.path.lastElement && evt.data.path.lastElement.getAscendant('div', true);
        if (element) {
          command.setState(CKEDITOR.TRISTATE_DISABLED);
        }
        else {
          command.setState(CKEDITOR.TRISTATE_OFF);
        }
      });

      var allowedContent = 'div(!ckeditor-readmore)';

      // Wrap selection.
      editor.addCommand('ckeditor_readmore', {
        allowedContent: allowedContent,

        exec: function (editor) {

          var selectedHtml = "";
          var selection = editor.getSelection();

          if (selection) {
            selectedHtml = getSelectionHtml(selection);
          }

          console.log(selectedHtml);

          var div = new CKEDITOR.dom.element.createFromHtml(
            '<div class="ckeditor-readmore">' + selectedHtml + '</div>');
          editor.insertElement(div);

          function getSelectionHtml(selection) {
            var ranges = selection.getRanges();
            var html = '';
            for (var i = 0; i < ranges.length; i++) {
              html += getRangeHtml(ranges[i]);
            }
            return html;
          }

          function getRangeHtml(range) {
            var content = range.extractContents();
            // `content.$` is an actual DocumentFragment object (not a CKEDitor abstract)
            var children = content.$.childNodes;
            var html = '';
            for (var i = 0; i < children.length; i++) {
              var child = children[i];
              if (typeof child.outerHTML === 'string') {
                html += child.outerHTML;
              } else {
                html += child.textContent;
              }
            }
            return html;
          }
        }
      });

    }
  });
})(jQuery);