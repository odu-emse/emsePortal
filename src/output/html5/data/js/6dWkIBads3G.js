window.globalProvideData('slide', '{"title":"Liabilities indicate what the firm has _______________?","trackViews":true,"showMenuResultIcon":false,"viewGroupId":"","historyGroupId":"","videoZoom":"","scrolling":false,"transition":"appear","transDuration":0,"transDir":1,"wipeTrans":false,"slideLock":false,"navIndex":-1,"globalAudioId":"","thumbnailid":"","presenterRef":{"id":"none"},"showAnimationId":"","lmsId":"Slide27","width":720,"height":405,"resume":true,"background":{"type":"fill","fill":{"type":"linear","rotation":90,"colors":[{"kind":"color","rgb":"0xFFFFFF","alpha":100,"stop":0}]}},"id":"6dWkIBads3G","actionGroups":{"ActGrpOnSubmitButtonClick":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"noteq","valuea":"6UfWHyeHUCi.$Text","typea":"property","valueb":"","typeb":"string"}},"thenActions":[{"kind":"eval_interaction","id":"_this.5oa04LaP8IU"}],"elseActions":[{"kind":"gotoplay","window":"MessageWnd","wndtype":"normal","objRef":{"type":"string","value":"_player.MsgScene_6DQRIqFo6LV.InvalidPromptSlide"}}]}]},"ActGrpOnNextButtonClick":{"kind":"actiongroup","actions":[{"kind":"gotoplay","window":"_current","wndtype":"normal","objRef":{"type":"string","value":"_player.5qmVcvPCJ80.6P7KVr4ubx8"}}]},"ReviewInt_5ZrYgos3RQT":{"kind":"actiongroup","actions":[{"kind":"set_enabled","objRef":{"type":"string","value":"6UfWHyeHUCi"},"enabled":{"type":"boolean","value":false}},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"5oa04LaP8IU.$Status","typea":"property","valueb":"correct","typeb":"string"}},"thenActions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"5ZrYgos3RQT_CorrectReview"}}],"elseActions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"5ZrYgos3RQT_IncorrectReview"}}]},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_5ZrYgos3RQT","typea":"var","valueb":"6OQ5wDfnLfF","typeb":"string"}},"thenActions":[{"kind":"exe_actiongroup","id":"SetLayout_pxabnsnfns11111110101"},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.6OQ5wDfnLfF.$Passed","typea":"property","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewIntCorrectIncorrect_5ZrYgos3RQT"}]},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.6OQ5wDfnLfF.$Passed","typea":"property","valueb":false,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewIntCorrectIncorrect_5ZrYgos3RQT"}]}]}]},"ReviewIntCorrectIncorrect_5ZrYgos3RQT":{"kind":"actiongroup","actions":[{"kind":"show","transition":"appear","objRef":{"type":"string","value":"5ZrYgos3RQT_ReviewShape"}}]},"AnsweredInt_5ZrYgos3RQT":{"kind":"actiongroup","actions":[{"kind":"exe_actiongroup","id":"DisableChoices_5ZrYgos3RQT"},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"pxabnsnfns11111110101"}],"elseActions":[{"kind":"set_window_control_layout","name":"pxabnsnfns11111110101"}]}]},"DisableChoices_5ZrYgos3RQT":{"kind":"actiongroup","actions":[{"kind":"set_enabled","objRef":{"type":"string","value":"6UfWHyeHUCi"},"enabled":{"type":"boolean","value":false}}]},"5ZrYgos3RQT_CheckAnswered":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"or","statements":[{"kind":"compare","operator":"eq","valuea":"5oa04LaP8IU.$Status","typea":"property","valueb":"correct","typeb":"string"},{"kind":"compare","operator":"eq","valuea":"_player.6OQ5wDfnLfF.$QuizComplete","typea":"property","valueb":true,"typeb":"boolean"}]}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_5ZrYgos3RQT"}],"elseActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"5oa04LaP8IU.$Status","typea":"property","valueb":"incorrect","typeb":"string"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"gte","valuea":"5oa04LaP8IU.$AttemptCount","typea":"property","valueb":1,"typeb":"number"}},"thenActions":[{"kind":"exe_actiongroup","id":"AnsweredInt_5ZrYgos3RQT"}]}]}]}]},"SetLayout_pxabnsnfns11111110101":{"kind":"actiongroup","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"pxabnsnfns11111110101"}],"elseActions":[{"kind":"set_window_control_layout","name":"pxabnsnfns11111110101"}]}]},"NavigationRestrictionNextSlide_6dWkIBads3G":{"kind":"actiongroup","actions":[{"kind":"exe_actiongroup","id":"ActGrpOnNextButtonClick"}]},"NavigationRestrictionPreviousSlide_6dWkIBads3G":{"kind":"actiongroup","actions":[{"kind":"history_prev"}]}},"events":[{"kind":"onbeforeslidein","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"$WindowId","typea":"property","valueb":"_frame","typeb":"string"}},"thenActions":[{"kind":"set_frame_layout","name":"npxnabsnfns11111110101"}],"elseActions":[{"kind":"set_window_control_layout","name":"npxnabsnfns11111110101"}]}]},{"kind":"onsubmitslide","actions":[{"kind":"exe_actiongroup","id":"ActGrpOnSubmitButtonClick"}]},{"kind":"onnextslide","actions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_5ZrYgos3RQT","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#CurrentQuiz_5ZrYgos3RQT","typea":"var","valueb":"6OQ5wDfnLfF","typeb":"string"}},"thenActions":[{"kind":"nextviewedslide","quizRef":{"type":"string","value":"_player.6OQ5wDfnLfF"},"completed_slide_ref":{"type":"string","value":"_player.5qmVcvPCJ80.5gpKA40zhy2"}}],"elseActions":[]}],"elseActions":[{"kind":"exe_actiongroup","id":"NavigationRestrictionNextSlide_6dWkIBads3G"}]}]},{"kind":"ontransitionin","actions":[{"kind":"adjustvar","variable":"_player.LastSlideViewed_6DQRIqFo6LV","operator":"set","value":{"type":"string","value":"_player."}},{"kind":"adjustvar","variable":"_player.LastSlideViewed_6DQRIqFo6LV","operator":"add","value":{"type":"property","value":"$AbsoluteId"}},{"kind":"if_action","condition":{"statement":{"kind":"compare","operator":"eq","valuea":"_player.#ReviewMode_5ZrYgos3RQT","typea":"var","valueb":true,"typeb":"boolean"}},"thenActions":[{"kind":"exe_actiongroup","id":"ReviewInt_5ZrYgos3RQT"}],"elseActions":[{"kind":"exe_actiongroup","id":"5ZrYgos3RQT_CheckAnswered"}]}]},{"kind":"onprevslide","actions":[{"kind":"exe_actiongroup","id":"NavigationRestrictionPreviousSlide_6dWkIBads3G"}]}],"slideLayers":[{"enableSeek":true,"enableReplay":true,"timeline":{"duration":5000,"events":[{"kind":"ontimelinetick","time":0,"actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"5ZrYgos3RQT_ReviewShape"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6UfWHyeHUCi"}},{"kind":"show","transition":"appear","objRef":{"type":"string","value":"6FyIZjasDVM"}}]}]},"objects":[{"kind":"textinput","bindto":"_player.TextEntry1","align":"left","verticalAlign":"top","rtl":false,"numeric":false,"multiline":false,"maxchars":0,"placeholder":"type your text here","fontsize":16,"textcolor":"0x000000","bold":false,"italic":false,"font":"Open Sans Charset0_v9TY33EDE6F2","marginleft":10,"marginright":10,"margintop":0,"marginbottom":0,"shapemaskId":"","xPos":36,"yPos":76,"tabIndex":1,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":323.5,"rotateYPos":14.5,"scaleX":100,"scaleY":100,"alpha":100,"rotation":0,"depth":1,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"textdata":{"uniqueId":"6UfWHyeHUCi","linkId":"","type":"vectortext","xPos":10,"yPos":5,"width":628,"height":30,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":131,"bottom":20,"pngfb":false,"pr":{"l":"Lib","i":237}}},"html5data":{"xPos":-1,"yPos":-1,"width":649,"height":31,"strokewidth":1}},"width":648,"height":30,"resume":true,"useHandCursor":true,"background":{"type":"vector","vectorData":{"left":-1,"top":-1,"right":649,"bottom":31,"altText":"type your text here","pngfb":false,"pr":{"l":"Lib","i":236}}},"id":"6UfWHyeHUCi","events":[{"kind":"onlosefocus","actions":[{"kind":"adjustvar","variable":"_player.TextEntry1","operator":"set","value":{"type":"property","value":"$Text"}}]},{"kind":"onkeypress","keycode":13,"shift":false,"ctrl":false,"alt":false,"actions":[{"kind":"exe_actiongroup","id":"_parent.ActGrpOnSubmitButtonClick"}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"6FyIZjasDVM_1736099326","id":"01","linkId":"txt__default_6FyIZjasDVM","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":606,"bottom":39,"pngfb":false,"pr":{"l":"Lib","i":359}}}],"shapemaskId":"","xPos":36,"yPos":17,"tabIndex":0,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":324,"rotateYPos":21.5,"scaleX":100,"scaleY":100,"alpha":100,"depth":2,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":648,"bottom":43,"altText":"Liabilities indicate what the firm has _______________?","pngfb":false,"pr":{"l":"Lib","i":200}},"html5data":{"xPos":-1,"yPos":-1,"width":649,"height":44,"strokewidth":0}},"width":648,"height":43,"resume":true,"useHandCursor":true,"id":"6FyIZjasDVM"},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"5ZrYgos3RQT_CorrectReview","id":"01","linkId":"5ZrYgos3RQT_CorrectReview","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":401,"bottom":35,"pngfb":false,"pr":{"l":"Lib","i":171}}}],"shapemaskId":"","xPos":0,"yPos":365,"tabIndex":3,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":360,"rotateYPos":20,"scaleX":100,"scaleY":100,"alpha":100,"depth":3,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":720,"bottom":40,"altText":"Correct","pngfb":false,"pr":{"l":"Lib","i":170}},"html5data":{"xPos":1,"yPos":1,"width":717,"height":37,"strokewidth":2}},"width":720,"height":40,"resume":false,"useHandCursor":true,"id":"5ZrYgos3RQT_CorrectReview","events":[{"kind":"onrelease","actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"_this"}}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"5ZrYgos3RQT_IncorrectReview","id":"01","linkId":"5ZrYgos3RQT_IncorrectReview","type":"vectortext","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":409,"bottom":35,"pngfb":false,"pr":{"l":"Lib","i":173}}}],"shapemaskId":"","xPos":0,"yPos":365,"tabIndex":4,"tabEnabled":true,"xOffset":0,"yOffset":0,"rotateXPos":360,"rotateYPos":20,"scaleX":100,"scaleY":100,"alpha":100,"depth":4,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":-1,"top":-1,"right":720,"bottom":40,"altText":"Incorrect","pngfb":false,"pr":{"l":"Lib","i":172}},"html5data":{"xPos":1,"yPos":1,"width":717,"height":37,"strokewidth":2}},"width":720,"height":40,"resume":false,"useHandCursor":true,"id":"5ZrYgos3RQT_IncorrectReview","events":[{"kind":"onrelease","actions":[{"kind":"hide","transition":"appear","objRef":{"type":"string","value":"_this"}}]}]},{"kind":"vectorshape","rotation":0,"accType":"text","cliptobounds":false,"defaultAction":"","textLib":[{"kind":"textdata","uniqueId":"txt_5ZrYgos3RQT_ReviewShape","id":"01","linkId":"txt_5ZrYgos3RQT_ReviewShape","type":"vectortext","altText":"","xPos":0,"yPos":0,"width":0,"height":0,"shadowIndex":-1,"vectortext":{"left":0,"top":0,"right":168,"bottom":200,"pngfb":false,"pr":{"l":"Lib","i":360}}}],"shapemaskId":"","xPos":0,"yPos":0,"tabIndex":2,"tabEnabled":false,"xOffset":0,"yOffset":0,"rotateXPos":324,"rotateYPos":159,"scaleX":100,"scaleY":100,"alpha":100,"depth":5,"scrolling":true,"shuffleLock":false,"data":{"hotlinkId":"","accState":0,"vectorData":{"left":0,"top":0,"right":700,"bottom":204,"altText":"","pngfb":false,"pr":{"l":"Lib","i":239}},"html5data":{"xPos":1,"yPos":1,"width":698,"height":202,"strokewidth":1}},"width":648,"height":318,"resume":false,"useHandCursor":true,"id":"5ZrYgos3RQT_ReviewShape"}],"startTime":-1,"elapsedTimeMode":"normal","useHandCursor":false,"resume":true,"kind":"slidelayer","isBaseLayer":true}]}');