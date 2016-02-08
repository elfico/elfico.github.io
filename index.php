<!DOCTYPE html>
<html>
<head>
    <title>Drug</title>
    <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">

</head>
<body>
<header>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Drug Interaction Test</a>
            </div>
            <div>
            </div>
        </div>
    </nav>
</header>
<div class="container">
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <h2>Drug Interaction Test</h2>
            <h4>How it Works</h4>
            <div>
                <ol>
                    <li>Select drugs from the pre-selected values or enter a drug name</li>
                    <li>Click Compare to see the interaction of each drug with the other</li>
                </ol>
            </div>


            <form method="get" action="#" enctype="multipart/form-data">
                <div class="from-group">
                    <div>
                        <label>Enter Drug Names</label>
                        <input list="drugs" class="form-control">
                        <datalist id="drugs">
                            <option value="p"></option>
                            <option value="ps"></option>
                        </datalist>
                    </div>
                    <br>
                    <div><input type="submit" class="btn btn-primary"name="send" value="Add" id="add">
                        <input type="submit" class="btn btn-primary" name="send" value="Check" id="checker"></div>
                </div>
            </form>

            <div>
                <h4>Selected Drugs</h4>
                <table class="table">
                    <tr id="nl">
                        <th>Drug Name</th>
                        <th>Interaction</th>
                    </tr>
                </table>
            </div>
<div id="message"></div>
        </div>
    </div>
</div>


<script type="text/javascript" src="assets/jQuery/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/custom.js"></script>
</body>
</html>