import React from "react";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

//needs to be revised to be able to make this work
//should be an action that routes one page to another
const NextPage = ({nextPage}) => {
return(
    <div>
        <a href="#{nextPage}"></a>
    </div>
)
}

export default NextPage;