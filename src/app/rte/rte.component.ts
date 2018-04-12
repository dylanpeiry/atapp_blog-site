import {Component, OnInit} from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-rte',
  templateUrl: './rte.component.html',
  styleUrls: ['./rte.component.css']
})
export class RteComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('#rte')
      .froalaEditor({
        theme: 'red',
        saveParam: 'content',
        saveURL: 'http://localhost:3000/rte'
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
        console.log(error);
      });

    $('#saveButton').click(function () {
      console.log("click");
      $('#rte').froalaEditor('save.save');
      $('#rte').froalaEditor('html.set','<a style="color:red;">Post saved.</a>');
    });
  }
}
