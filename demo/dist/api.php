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

            <h2>Methods</h2>
            <h3>Renderers</h3>
            <p>This is the list of methods you can call on renderers.<br> Checkout the <a href="./get-started.php#renderers">documentation</a> about renderers to get more informations.</p>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th width="40%">Methods</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><em>Renderer</em>.<strong>onEnter()</strong></td>
                    <td>This methods is called when the <strong>data-router-view</strong> is added to the DOM.</td>
                </tr>
                <tr>
                    <td><em>Renderer</em>.<strong>onLeave()</strong></td>
                    <td>This methods is called when transition to hide the <strong>data-router-view</strong> is called.</td>
                </tr>
                <tr>
                    <td><em>Renderer</em>.<strong>onEnterCompleted()</strong></td>
                    <td>This methods is called when the transition to show the <strong>data-router-view</strong> is over.</td>
                </tr>
                <tr>
                    <td><em>Renderer</em>.<strong>onLeaveCompleted()</strong></td>
                    <td>This methods is called when the <strong>data-router-view</strong> is removed from the DOM.</td>
                </tr>
            </table>

            <h3>Transitions</h3>
            <p>This is the list of methods you can call on transitions.<br> Checkout the <a href="./get-started.php#transitions">documentation</a> about transitions to get more informations.</p>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th width="40%">Methods</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><em>Transition</em>.<strong>in(<em>view</em>, <em>done</em>)</strong></td>
                    <td>This method is called to show the <strong>data-router-view</strong>.</td>
                </tr>
                <tr>
                    <td><em>Transition</em>.<strong>out(<em>view</em>, <em>done</em>)</strong></td>
                    <td>This method is called to hide the <strong>data-router-view</strong>.</td>
                </tr>
            </table>

            <h3>Core</h3>
            <p><strong>Highway</strong> is based on the <a href="https://github.com/scottcorgan/tiny-emitter#readme" target="_blank">tiny-emitter</a> library so when we call <strong>Highway.Core</strong> we have access to all the methods available in <a href="https://github.com/scottcorgan/tiny-emitter#readme" target="_blank">tiny-emitter</a> in order to use the events listed below.</p>
            <p>In addition to the methods inherited from <a href="https://github.com/scottcorgan/tiny-emitter#readme" target="_blank">tiny-emitter</a>, you have some buil-in ones you might need:</p>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th width="40%">Methods</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><em>Core</em>.<strong>bind()</strong></td>
                    <td>This method listen to all links of the document that have <strong>no target</strong> attribute and calls <strong>Highway</strong> on <em>click</em>.</td>
                </tr>
                <tr>
                    <td><em>Core</em>.<strong>unbind()</strong></td>
                    <td>This method clears the events attached to all the links of the document.</td>
                </tr>
                <tr>
                    <td><em>Core</em>.<strong>location(<em>url</em>)</strong></td>
                    <td>This method navigates to a given <strong>same-origin</strong> URL using <strong>Highway</strong>.</td>
                </tr>
            </table>

            <h2>Events</h2>

            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th width="40%">Events</th>
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
        </article>
    </main>

    <?php include('./parts/footer.php'); ?>
</body>
</html>
