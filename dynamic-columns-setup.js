
function dynamicColumnSetup() {
    var dynamicColumns = document.querySelectorAll("[dynamic-columns]")
    var htmlTags = "h1, h2, h3, h4, h5, h6, p";

    dynamicColumns.forEach((dynamicColumn) => {
        var minColumns = dynamicColumn.getAttribute("min-columns");
        var maxColumns = dynamicColumn.getAttribute("max-columns");
        var htmlTagElements = dynamicColumn.querySelector(".original-content").querySelectorAll(htmlTags);
        var breakPointIndexes = [];

        htmlTagElements.forEach((el, index) => {
            if ((el.innerHTML) === "[column-break]") {
                breakPointIndexes.push(index);
            }
        });
        breakPointIndexes.push(htmlTagElements.length - 1);
        var columnOutput = dynamicColumn.querySelector(".column-output")
        var columns = [];
        var currentBreakPoint = 0;
        var columnCount = breakPointIndexes.length;

        var htmlElementsArray = Array.prototype.slice.call(htmlTagElements);
        breakPointIndexes.forEach((breakPoint, j) => {
            columns.push(htmlElementsArray.slice(currentBreakPoint, breakPoint));

            if (j == breakPointIndexes.length - 1) {
                columns[columns.length - 1].push(htmlElementsArray[htmlElementsArray.length - 1]);
            } else {
                currentBreakPoint = breakPoint + 1;
            }
        });

        columnOutput.innerHTML = "";

        var columnStructure = document.createElement("div");
        columnStructure.setAttribute("class", "column-structure");

        columns.forEach(column => {
            console.log(column)
            var reformedHTML = "";
            column.forEach(htmlElement => {
                reformedHTML += htmlElement.outerHTML;
            });


            let columnDiv = document.createElement("div");
            columnDiv.setAttribute("class", "column");
            columnDiv.innerHTML = reformedHTML;
            columnStructure.appendChild(columnDiv);
        });

        columnOutput.appendChild(columnStructure);

        if (columnCount > maxColumns) {
            dynamicColumn.setAttribute("element-error", "true");
            dynamicColumn.setAttribute("column-error", "max-column");
        } else if (columnCount < minColumns) {
            dynamicColumn.setAttribute("element-error", "true");
            dynamicColumn.setAttribute("column-error", "min-column");
        } else {
        }
        if (columnCount > maxColumns || columnCount < minColumns) {
            dynamicColumn.setAttribute("element-error", "true");
            dynamicColumn.setAttribute("column-error", "min-column");
            dynamicColumn.setAttribute("column-error", "max-column");
        } else {
            dynamicColumn.setAttribute("element-error", "false");
            dynamicColumn.setAttribute("column-error", "");
        }
    });
}           