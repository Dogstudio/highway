<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('./parts/head.php'); ?>
</head>
<body>
    <main class="site-container">
        <?php include('./parts/header.php'); ?>

        <article class="site-content" data-router-view="api">
            <h1>API</h1>
            <h2>Events</h2>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th width="250">Events</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>NAVIGATE_IN</td>
                    <td>
                        This event is triggered everytime the transition to show the <strong>data-router-view</strong> is called.
                        It returns those arguments:<br><br>
                        <ul>
                            <li><strong>to:</strong> The <strong>data-router-view</strong> to show.</li>
                            <li><strong>state:</strong> The URL datas of the current view.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>NAVIGATE_OUT</td>
                    <td>
                        This event is triggered everytime the transition to hide the <strong>data-router-view</strong> is called.
                        It returns those arguments:<br><br>
                        <ul>
                            <li><strong>from:</strong> The <strong>data-router-view</strong> to hide.</li>
                            <li><strong>state:</strong> The URL datas of the current view.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>NAVIGATE_END</td>
                    <td>
                        This event is triggered everytime a transition ends.
                        It returns those arguments:<br><br>
                        <ul>
                            <li><strong>from:</strong> The <strong>data-router-view</strong> to hide.</li>
                            <li><strong>to:</strong> The <strong>data-router-view</strong> to show.</li>
                            <li><strong>state:</strong> The URL datas of the current view.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>NAVIGATE_ERROR</td>
                    <td>
                        This event is triggered everytime an error happens.
                        It returns this argument:<br><br>
                        <ul>
                            <li><strong>error:</strong> The error datas from the HTTPRequest.</li>
                        </ul>
                    </td>
                </tr>
            </table>

            <h2>Methods</h2>
            <h3>Renderers</h3>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th>Methods</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>onEnter()</td>
                    <td></td>
                </tr>
            </table>

            <h3>Transitions</h3>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th>Methods</th>
                    <th>Description</th>
                </tr>
            </table>
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
