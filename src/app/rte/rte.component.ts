import { Component, OnInit } from '@angular/core';
import {FroalaEditorModule,FroalaViewDirective} from "angular-froala-wysiwyg";

@Component({
  selector: 'app-rte',
  templateUrl: './rte.component.html',
  styleUrls: ['./rte.component.css']
})
export class RteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#rte')
      .froalaEditor({
        // Set the save param.
        saveParam: 'content',

        // Set the save URL.
        saveURL: 'http://localhost:3000/rte',

        // HTTP request type.
        saveMethod: 'POST',

        // Additional save params.
        saveParams: {id: 'my_editor'}
      })
      .on('froalaEditor.save.before', function (e, editor) {
        // Before save request is made.
        console.log("before");
      })
      .on('froalaEditor.save.after', function (e, editor, response) {
        // After successfully save request.
        console.log(response);

      })
      .on('froalaEditor.save.error', function (e, editor, error) {
        console.log("error");
      })

    $('#saveButton').click(function () {
      console.log("click");
      $('#rte').froalaEditor('save.save');
    })
  }

}
