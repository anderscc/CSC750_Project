import React from "react";
import { BrowserRouter as Router, Routes, Route, Link}
    from 'react-router-dom';

//needs to be revised to be able to make this work
//should be an action that routes one page to another
function AnotherPage ({label, nextPage})  {
return(
    <div>
        <Link to = {nextPage} className="btn btn-primary">{label}</Link>
    </div>
)
}

export default AnotherPage;