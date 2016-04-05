'use strict';

import http from 'http';
import fs from 'fs';
import path from 'path';
import soap from 'soap';

const result = {
  Inserta_GPSResult: {
    schema: {
      attributes: {id: 'NewDataSet'
      },
      element: {
        attributes: {
          name: 'NewDataSet',
          'msdata:IsDataSet': 'true',
          'msdata:UseCurrentLocale': 'true'
        },
        complexType: {
          choice: {
            attributes: {minOccurs: '0', maxOccurs: 'unbounded'},
            element: {
              attributes: {name: 'Table', 'msprop:REFCursorName': 'REFCursor'},
              complexType: {
                sequence: {
                  element: {
                    attributes: {
                      name: 'ID_DT',
                      'msprop:OraDbType': '107',
                      type: 'xs:decimal',
                      minOccurs: '0'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    diffgram: {
      NewDataSet: {
        Table: {
          attributes: {'diffgr:id': 'Table1', 'msdata:rowOrder': '0'},
          ID_DT: '4602'
        }
      }
    }
  }
};
const service = {
  Service1: {
    Service1Soap: {
      Inserta_GPS: (args, cb) => cb(result)
    }
  }
};

const xml = fs.readFileSync(path.join(__dirname, '..', 'wsdl', 'service.wsdl'), 'utf8');
const server = http.createServer((request, response) => {
  response.end(`404: Not Found: ${request.url}`);
});

server.listen(8000);
soap.listen(server, '/wsdl', service, xml);
