import { Component, OnInit } from '@angular/core';
import { request } from 'graphql-request';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';

const BASE_URL = 'http://istio-ingressgateway-patientcare-istio.sandbox-ocp43-one-176292-be5b1ee812fa4041cc73b6bbf969fc88-0000.eu-gb.containers.appdomain.cloud/pharmacistbff/graphql';

const QueryPillboxes = `
	  	query {
			pillboxes {
          pillboxid
          userid
          consumed
          remaining
			}
	  	}
	  `;

@Component({
  selector: 'app-pillbox-list',
  templateUrl: './pillbox-list.component.html',
  styleUrls: ['./pillbox-list.component.scss']
})
export class PillboxListComponent implements OnInit {
  
  public model = new TableModel();
  public skeleton = true;
  names = ['John', 'Williams', 'Kane', 'Jackson', 'Maria', 'Alexa', 'David', 'Allan', 'George', 'Jim'];

  constructor() { }

  ngOnInit() {
    this.skeleton = true;
    request(BASE_URL, QueryPillboxes).then(
			(resp: any) => {
        console.log(resp.pillboxes);
        let pillboxList = resp.pillboxes;
        pillboxList.forEach(pillbox => {
		  let num = Math.floor(Math.random() * (10 - 1) + 1);
          let name = this.names[num];
          let row = [
            new TableItem({data: pillbox.pillboxid}),
            new TableItem({data: pillbox.userid}),
			new TableItem({data: name}),
            new TableItem({data: pillbox.consumed}),
            new TableItem({data: pillbox.remaining})
          ]
          this.model.addRow(row);
        });
        this.model.header = [
          new TableHeaderItem({data: "Pillbox id"}),
          new TableHeaderItem({data: "Userid" }),
	      new TableHeaderItem({data: "Name"}),
          new TableHeaderItem({data: "Consumed" }),
          new TableHeaderItem({data: "Remaining" })
        ];
        this.skeleton = false;
      });
      
    //   this.model.data = [
    //     [new TableItem({data: "asdf"}), new TableItem({data: "qwer"})],
    //      [new TableItem({data: "csdf"}), new TableItem({data: "zwer"})],
    //      [new TableItem({data: "bsdf"}), new TableItem({data: "swer"})],
    //      [new TableItem({data: "csdf"}), new TableItem({data: "twer"})]
    //  ];
  }

}
