### ArrayParser output

1. **"[123, [22], 33]"**

   ```javascript
   [Running] node "/Users/hyeon/javascript-json/main.js"
   {
     "type": "Array",
     "child": [
       {
         "type": "Number",
         "value": "123",
         "child": []
       },
       {
         "type": "Array",
         "child": [
           {
             "type": "Number",
             "value": "22",
             "child": []
           }
         ]
       },
       {
         "type": "Number",
         "value": "33",
         "child": []
       }
     ]
   }
   *-----------------------------------------------*
   타입 갯수를 분석하여 결과를 출력합니다
   array: 2
   string: 0
   null: 0
   boolean: 0
   object: 0
   number: 3
   
   
   [Done] exited with code=0 in 0.061 seconds
   ```

2. **"[123, [1,2,3,4,5], 33]"**

   ```javascript
   [Running] node "/Users/hyeon/javascript-json/main.js"
   {
     "type": "Array",
     "child": [
       {
         "type": "Number",
         "value": "123",
         "child": []
       },
       {
         "type": "Array",
         "child": [
           {
             "type": "Number",
             "value": "1",
             "child": []
           },
           {
             "type": "Number",
             "value": "2",
             "child": []
           },
           {
             "type": "Number",
             "value": "3",
             "child": []
           },
           {
             "type": "Number",
             "value": "4",
             "child": []
           },
           {
             "type": "Number",
             "value": "5",
             "child": []
           }
         ]
       },
       {
         "type": "Number",
         "value": "33",
         "child": []
       }
     ]
   }
   *-----------------------------------------------*
   타입 갯수를 분석하여 결과를 출력합니다
   array: 2
   string: 0
   null: 0
   boolean: 0
   object: 0
   number: 5
   
   
   [Done] exited with code=0 in 0.1 seconds
   ```

3. **"[123,[22,23,[11,[112233],112],55],33]";**

   ```javascript
   [Running] node "/Users/hyeon/javascript-json/main.js"
   {
     "type": "Array",
     "child": [
       {
         "type": "Number",
         "value": "123",
         "child": []
       },
       {
         "type": "Array",
         "child": [
           {
             "type": "Number",
             "value": "22",
             "child": []
           },
           {
             "type": "Number",
             "value": "23",
             "child": []
           },
           {
             "type": "Array",
             "child": [
               {
                 "type": "Number",
                 "value": "11",
                 "child": []
               },
               {
                 "type": "Array",
                 "child": [
                   {
                     "type": "Number",
                     "value": "112233",
                     "child": []
                   }
                 ]
               },
               {
                 "type": "Number",
                 "value": "112",
                 "child": []
               }
             ]
           },
           {
             "type": "Number",
             "value": "55",
             "child": []
           }
         ]
       },
       {
         "type": "Number",
         "value": "33",
         "child": []
       }
     ]
   }
   *-----------------------------------------------*
   타입 갯수를 분석하여 결과를 출력합니다
   array: 4
   string: 0
   null: 0
   boolean: 0
   object: 0
   number: 8
   
   
   [Done] exited with code=0 in 0.055 seconds
   ```

4. **"['1a3',[null,false,['11',[112233],112],55, '99'],33, true]"**

   ```javascript
   [Running] node "/Users/hyeon/javascript-json/main.js"
   {
     "type": "Array",
     "child": [
       {
         "type": "String",
         "value": "'1a3'",
         "child": []
       },
       {
         "type": "Array",
         "child": [
           {
             "type": "Null",
             "value": null,
             "child": []
           },
           {
             "type": "Boolean",
             "value": "false",
             "child": []
           },
           {
             "type": "Array",
             "child": [
               {
                 "type": "String",
                 "value": "'11'",
                 "child": []
               },
               {
                 "type": "Array",
                 "child": [
                   {
                     "type": "Number",
                     "value": "112233",
                     "child": []
                   }
                 ]
               },
               {
                 "type": "Number",
                 "value": "112",
                 "child": []
               }
             ]
           },
           {
             "type": "Number",
             "value": "55",
             "child": []
           },
           {
             "type": "String",
             "value": "'99'",
             "child": []
           }
         ]
       },
       {
         "type": "Number",
         "value": "33",
         "child": []
       },
       {
         "type": "Boolean",
         "value": "true",
         "child": []
       }
     ]
   }
   *-----------------------------------------------*
   타입 갯수를 분석하여 결과를 출력합니다
   array: 4
   string: 3
   null: 1
   boolean: 2
   object: 0
   number: 4
   
   
   [Done] exited with code=0 in 0.054 seconds
   ```

5. **"['1a'3',[22,23,[11,[112233],112],55],33]"**

   ```javascript
   '1a'3'(은/는) 올바른 문자열이 아닙니다
   ```

6. **"['1a3',[22,23,[11,[112233],112],55],3d3]"**

   ```javascript
   3d3(은/는) 알 수 없는 타입입니다
   ```

7. **"['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true]"**

   ```javascript
   [Running] node "/Users/hyeon/javascript-json/main.js"
   {
     "type": "Array",
     "child": [
       {
         "type": "String",
         "value": "'1a3'",
         "child": []
       },
       {
         "type": "Array",
         "child": [
           {
             "type": "Null",
             "value": null,
             "child": []
           },
           {
             "type": "Boolean",
             "value": "false",
             "child": []
           },
           {
             "type": "Array",
             "child": [
               {
                 "type": "String",
                 "value": "'11'",
                 "child": []
               },
               {
                 "type": "Array",
                 "child": [
                   {
                     "type": "Number",
                     "value": "112233",
                     "child": []
                   }
                 ]
               },
               {
                 "type": "Object",
                 "key": "easy",
                 "value": {
                   "type": "Array",
                   "child": [
                     {
                       "type": "String",
                       "value": "'hello'",
                       "child": []
                     },
                     {
                       "type": "Object",
                       "key": "a",
                       "value": "'a'"
                     },
                     {
                       "type": "String",
                       "value": "'world'",
                       "child": []
                     }
                   ]
                 }
               },
               {
                 "type": "Number",
                 "value": "112",
                 "child": []
               }
             ]
           },
           {
             "type": "Number",
             "value": "55",
             "child": []
           },
           {
             "type": "String",
             "value": "'99'",
             "child": []
           }
         ]
       },
       {
         "type": "Object",
         "key": "a",
         "value": "'str'",
         "key2": "b",
         "value2": {
           "type": "Array",
           "child": [
             {
               "type": "Number",
               "value": "912",
               "child": []
             },
             {
               "type": "Array",
               "child": [
                 {
                   "type": "Number",
                   "value": "5656",
                   "child": []
                 },
                 {
                   "type": "Number",
                   "value": "33",
                   "child": []
                 }
               ]
             },
             {
               "type": "Object",
               "key": "key",
               "value": "'innervalue'",
               "key2": "newkeys",
               "value2": {
                 "type": "Array",
                 "child": [
                   {
                     "type": "Number",
                     "value": "1",
                     "child": []
                   },
                   {
                     "type": "Number",
                     "value": "2",
                     "child": []
                   },
                   {
                     "type": "Number",
                     "value": "3",
                     "child": []
                   },
                   {
                     "type": "Number",
                     "value": "4",
                     "child": []
                   },
                   {
                     "type": "Number",
                     "value": "5",
                     "child": []
                   }
                 ]
               }
             }
           ]
         }
       },
       {
         "type": "Boolean",
         "value": "true",
         "child": []
       }
     ]
   }
   *-----------------------------------------------*
   타입 갯수를 분석하여 결과를 출력합니다
   array: 8
   string: 8
   null: 1
   boolean: 2
   object: 4
   number: 9
   
   
   [Done] exited with code=0 in 0.058 seconds
   ```

8. **"['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]"**

   ```javascript
   [Running] node "/Users/hyeon/javascript-json/main.js"
   {
     "type": "Array",
     "child": [
       {
         "type": "String",
         "value": "'1a3'",
         "child": []
       },
       {
         "type": "Array",
         "child": [
           {
             "type": "Null",
             "value": null,
             "child": []
           },
           {
             "type": "Boolean",
             "value": "false",
             "child": []
           },
           {
             "type": "Array",
             "child": [
               {
                 "type": "String",
                 "value": "'11'",
                 "child": []
               },
               {
                 "type": "Number",
                 "value": "112",
                 "child": []
               },
               {
                 "type": "String",
                 "value": "'99'",
                 "child": []
               }
             ]
           },
           {
             "type": "Object",
             "key": "a",
             "value": "'str'",
             "key2": "b",
             "value2": {
               "type": "Array",
               "child": [
                 {
                   "type": "Number",
                   "value": "912",
                   "child": []
                 },
                 {
                   "type": "Array",
                   "child": [
                     {
                       "type": "Number",
                       "value": "5656",
                       "child": []
                     },
                     {
                       "type": "Number",
                       "value": "33",
                       "child": []
                     }
                   ]
                 }
               ]
             }
           },
           {
             "type": "Boolean",
             "value": "true",
             "child": []
           }
         ]
       }
     ]
   }
   *-----------------------------------------------*
   타입 갯수를 분석하여 결과를 출력합니다
   array: 5
   string: 4
   null: 1
   boolean: 2
   object: 1
   number: 4
   
   
   [Done] exited with code=0 in 0.071 seconds
   ```

9. **"['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]"**

   ```javascript
   ERROR
   앗! 정상적으로 종료되지 않은 '배열'이 있어요 :(
   ```

10. **"['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]]"**

    ```javascript
    ERROR
    앗! 정상적으로 종료되지 않은 '객체'가 있어요 :(
    ```

11. **"['1a3',[null,false,['11',112,'99'], {a:'str', b  [912,[5656,33]]}, true]]"**

    ```javascript
    ERROR
    앗! 객체중에 ':'가 누락되었어요 :(
    ```

12. **"[123, [22],, 33]"**

    ```javascript
    [Running] node "/Users/hyeon/javascript-json/main.js"
    NOTIFY -*
    데이터 중에 공백이 존재합니다.
    제거 후, 정상적인 데이터로 반환합니다 :)
    ---------------------------------------
    {
      "type": "Array",
      "child": [
        {
          "type": "Number",
          "value": "123",
          "child": []
        },
        {
          "type": "Array",
          "child": [
            {
              "type": "Number",
              "value": "22",
              "child": []
            }
          ]
        },
        {
          "type": "Number",
          "value": "33",
          "child": []
        }
      ]
    }
    *-----------------------------------------------*
    타입 갯수를 분석하여 결과를 출력합니다
    array: 2
    string: 0
    null: 0
    boolean: 0
    object: 0
    number: 3
    
    
    [Done] exited with code=0 in 0.055 seconds
    ```

13. **"['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]"**

    ```javascript
    [Running] node "/Users/hyeon/javascript-json/main.js"
    {
      "type": "Array",
      "child": [
        {
          "type": "String",
          "value": "'1a3'",
          "child": []
        },
        {
          "type": "Array",
          "child": [
            {
              "type": "Null",
              "value": null,
              "child": []
            },
            {
              "type": "Boolean",
              "value": "false",
              "child": []
            },
            {
              "type": "Array",
              "child": [
                {
                  "type": "String",
                  "value": "'11'",
                  "child": []
                },
                {
                  "type": "Number",
                  "value": "112",
                  "child": []
                },
                {
                  "type": "String",
                  "value": "'99'",
                  "child": []
                }
              ]
            },
            {
              "type": "Object",
              "key": "a",
              "value": "'str'",
              "key2": "b",
              "value2": {
                "type": "Array",
                "child": [
                  {
                    "type": "Number",
                    "value": "912",
                    "child": []
                  },
                  {
                    "type": "Array",
                    "child": [
                      {
                        "type": "Number",
                        "value": "5656",
                        "child": []
                      },
                      {
                        "type": "Number",
                        "value": "33",
                        "child": []
                      }
                    ]
                  }
                ]
              }
            },
            {
              "type": "Boolean",
              "value": "true",
              "child": []
            }
          ]
        }
      ]
    }
    *-----------------------------------------------*
    타입 갯수를 분석하여 결과를 출력합니다
    array: 5
    string: 4
    null: 1
    boolean: 2
    object: 1
    number: 4
    
    
    [Done] exited with code=0 in 0.108 seconds
    ```

    