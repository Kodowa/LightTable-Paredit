if(!lt.util.load.provided_QMARK_('lt.plugins.paredit')) {
goog.provide('lt.plugins.paredit');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
lt.plugins.paredit.opposites = new cljs.core.PersistentArrayMap(null, 6, [")","(","(",")","{","}","}","{","[","]","]","["], null);
lt.plugins.paredit.dir_swap = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"left","left",1017222009)], null);
lt.plugins.paredit.form_start = /[\{\(\[]/;
lt.plugins.paredit.form_end = /[\}\)\]]/;
lt.plugins.paredit.end_loc = (function end_loc(ed){var last_line = lt.objs.editor.last_line.call(null,ed);return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),last_line,new cljs.core.Keyword(null,"ch","ch",1013907415),(function (){var x__8107__auto__ = 0;var y__8108__auto__ = (lt.objs.editor.line_length.call(null,ed,last_line) - 1);return ((x__8107__auto__ > y__8108__auto__) ? x__8107__auto__ : y__8108__auto__);
})()], null);
});
lt.plugins.paredit.loc_GT_loc = (function loc_GT_loc(l1,l2){if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l1) > new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l2)))
{return true;
} else
{if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l2) > new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(l1)))
{return false;
} else
{if((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(l1) > new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(l2)))
{return true;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return false;
} else
{return null;
}
}
}
}
});
lt.plugins.paredit.move_loc_line = (function move_loc_line(ed,loc,dir){if(cljs.core.truth_(loc))
{var neue = cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",1017226086)], null),cljs.core._PLUS_,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?-1:1));if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue) < 0))
{return null;
} else
{if((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue) >= lt.objs.editor.last_line.call(null,ed)))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.assoc.call(null,neue,new cljs.core.Keyword(null,"ch","ch",1013907415),((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"up","up",1013907981)))?(function (){var x__8107__auto__ = (lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(neue)) - 1);var y__8108__auto__ = 0;return ((x__8107__auto__ > y__8108__auto__) ? x__8107__auto__ : y__8108__auto__);
})():0));
} else
{return null;
}
}
}
} else
{return null;
}
});
lt.plugins.paredit.move_loc = (function move_loc(ed,loc,dir){if(cljs.core.truth_(loc))
{var len = lt.objs.editor.line_length.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var neue = lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1));if((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(neue) < 0))
{return lt.plugins.paredit.move_loc_line.call(null,ed,loc,new cljs.core.Keyword(null,"up","up",1013907981));
} else
{if((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(neue) >= len))
{return lt.plugins.paredit.move_loc_line.call(null,ed,loc,new cljs.core.Keyword(null,"down","down",1016993812));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return neue;
} else
{return null;
}
}
}
} else
{return null;
}
});
lt.plugins.paredit.within_range = (function within_range(p__9499,cur){var vec__9501 = p__9499;var start = cljs.core.nth.call(null,vec__9501,0,null);var end = cljs.core.nth.call(null,vec__9501,1,null);return ((end >= new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur))) && ((new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur) >= start));
});
lt.plugins.paredit.scan = (function scan(p__9502){var map__9504 = p__9502;var map__9504__$1 = ((cljs.core.seq_QMARK_.call(null,map__9504))?cljs.core.apply.call(null,cljs.core.hash_map,map__9504):map__9504);var opts = map__9504__$1;var regex = cljs.core.get.call(null,map__9504__$1,new cljs.core.Keyword(null,"regex","regex",1122296761));var loc = cljs.core.get.call(null,map__9504__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9504__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__9504__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (!(lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);if(cljs.core.truth_((function (){var and__7788__auto__ = ch;if(cljs.core.truth_(and__7788__auto__))
{return cljs.core.re_seq.call(null,regex,ch);
} else
{return and__7788__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{{
var G__9565 = next_loc;
var G__9566 = next_line;
cur = G__9565;
line = G__9566;
continue;
}
}
}
break;
}
});
lt.plugins.paredit.string_BAR_comment_QMARK_ = (function string_BAR_comment_QMARK_(ed,cur,allow_strings_QMARK_){var type = lt.objs.editor.__GT_token_type.call(null,ed,lt.objs.editor.adjust_loc.call(null,cur,1));if(cljs.core.truth_(type))
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,type,"comment-form")))
{return false;
} else
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,type,"comment")))
{return true;
} else
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,type,"string")))
{if(cljs.core.truth_(allow_strings_QMARK_))
{return null;
} else
{return true;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return false;
} else
{return null;
}
}
}
}
} else
{return null;
}
});
lt.plugins.paredit.paired_scan = (function paired_scan(p__9505){var map__9508 = p__9505;var map__9508__$1 = ((cljs.core.seq_QMARK_.call(null,map__9508))?cljs.core.apply.call(null,cljs.core.hash_map,map__9508):map__9508);var opts = map__9508__$1;var only_for_QMARK_ = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697));var allow_strings_QMARK_ = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235));var allow_end_QMARK_ = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"allow-end?","allow-end?",3920538170));var negation = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"negation","negation",1935015639));var for$ = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"for","for",1014005819));var loc = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = cljs.core.get.call(null,map__9508__$1,new cljs.core.Keyword(null,"dir","dir",1014003711));var vec__9509 = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_end,lt.plugins.paredit.form_start], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.plugins.paredit.form_start,lt.plugins.paredit.form_end], null));var stack_chars = cljs.core.nth.call(null,vec__9509,0,null);var stack_ends = cljs.core.nth.call(null,vec__9509,1,null);var final_loc = lt.plugins.paredit.end_loc.call(null,ed);var search_range = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) - 100),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc) + 100)], null);var cur = loc;var line = lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc));var stack = cljs.core.PersistentVector.EMPTY;while(true){
if((cljs.core.not.call(null,cur)) || (cljs.core.not.call(null,line)) || (!(lt.plugins.paredit.within_range.call(null,search_range,cur))))
{return null;
} else
{var ch = cljs.core.get.call(null,line,new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur));var next_loc = lt.plugins.paredit.move_loc.call(null,ed,cur,dir);var next_line = ((cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)))?lt.objs.editor.line.call(null,ed,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(next_loc)):line);var valid_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur,allow_strings_QMARK_));var stackable_QMARK_ = cljs.core.not.call(null,lt.plugins.paredit.string_BAR_comment_QMARK_.call(null,ed,cur));if(cljs.core.truth_((function (){var and__7788__auto__ = allow_end_QMARK_;if(cljs.core.truth_(and__7788__auto__))
{return (valid_QMARK_) && ((cljs.core._EQ_.call(null,final_loc,cur)) || (cljs.core.not_EQ_.call(null,next_line,line)));
} else
{return and__7788__auto__;
}
})()))
{if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,lt.objs.editor.adjust_loc.call(null,cur,1)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(cur),new cljs.core.Keyword(null,"ch","ch",1013907415),-1], null)], null);
}
} else
{if(cljs.core.truth_((function (){var and__7788__auto__ = ch;if(cljs.core.truth_(and__7788__auto__))
{var and__7788__auto____$1 = cljs.core.re_seq.call(null,for$,ch);if(cljs.core.truth_(and__7788__auto____$1))
{var and__7788__auto____$2 = valid_QMARK_;if(and__7788__auto____$2)
{var and__7788__auto____$3 = cljs.core.not.call(null,cljs.core.seq.call(null,stack));if(and__7788__auto____$3)
{if(cljs.core.truth_(negation))
{return negation.call(null,line,cur);
} else
{return true;
}
} else
{return and__7788__auto____$3;
}
} else
{return and__7788__auto____$2;
}
} else
{return and__7788__auto____$1;
}
} else
{return and__7788__auto__;
}
})()))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ch,cur], null);
} else
{if(cljs.core.truth_((function (){var and__7788__auto__ = ch;if(cljs.core.truth_(and__7788__auto__))
{var and__7788__auto____$1 = cljs.core.not.call(null,only_for_QMARK_);if(and__7788__auto____$1)
{var and__7788__auto____$2 = stackable_QMARK_;if(and__7788__auto____$2)
{var and__7788__auto____$3 = cljs.core.re_seq.call(null,stack_ends,ch);if(cljs.core.truth_(and__7788__auto____$3))
{return cljs.core.not_EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack)));
} else
{return and__7788__auto____$3;
}
} else
{return and__7788__auto____$2;
}
} else
{return and__7788__auto____$1;
}
} else
{return and__7788__auto__;
}
})()))
{return null;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__9567 = next_loc;
var G__9568 = next_line;
var G__9569 = (cljs.core.truth_((function (){var and__7788__auto__ = ch;if(cljs.core.truth_(and__7788__auto__))
{var and__7788__auto____$1 = stackable_QMARK_;if(and__7788__auto____$1)
{return cljs.core.re_seq.call(null,stack_chars,ch);
} else
{return and__7788__auto____$1;
}
} else
{return and__7788__auto__;
}
})())?cljs.core.conj.call(null,stack,ch):(cljs.core.truth_((function (){var and__7788__auto__ = ch;if(cljs.core.truth_(and__7788__auto__))
{return (stackable_QMARK_) && (cljs.core._EQ_.call(null,ch,lt.plugins.paredit.opposites.call(null,cljs.core.last.call(null,stack))));
} else
{return and__7788__auto__;
}
})())?cljs.core.pop.call(null,stack):((new cljs.core.Keyword(null,"else","else",1017020587))?stack:null)));
cur = G__9567;
line = G__9568;
stack = G__9569;
continue;
}
} else
{return null;
}
}
}
}
}
break;
}
});
lt.plugins.paredit.form_boundary = (function form_boundary(ed,loc,regex){var vec__9512 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"only-for?","only-for?",1260514697),regex,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,new cljs.core.Keyword(null,"left","left",1017222009)),new cljs.core.Keyword(null,"for","for",1014005819),(function (){var or__7800__auto__ = regex;if(cljs.core.truth_(or__7800__auto__))
{return or__7800__auto__;
} else
{return lt.plugins.paredit.form_start;
}
})()], null));var c = cljs.core.nth.call(null,vec__9512,0,null);var start = cljs.core.nth.call(null,vec__9512,1,null);var vec__9513 = ((cljs.core.not.call(null,c))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null):lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"right","right",1122416014),new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,start,new cljs.core.Keyword(null,"right","right",1122416014)),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(lt.plugins.paredit.opposites.call(null,c)),cljs.core.str("]")].join(''))], null)));var c__$1 = cljs.core.nth.call(null,vec__9513,0,null);var end = cljs.core.nth.call(null,vec__9513,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null);
});
lt.plugins.paredit.escaped_paired_scan = (function escaped_paired_scan(ed,loc,thing,dir){var vec__9515 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"allow-strings?","allow-strings?",1208165235),true,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,loc,dir),new cljs.core.Keyword(null,"negation","negation",1935015639),(function (line,loc__$1){return cljs.core.not_EQ_.call(null,cljs.core.get.call(null,line,lt.objs.editor.adjust_loc.call(null,loc__$1,-1)),"\\");
}),new cljs.core.Keyword(null,"for","for",1014005819),cljs.core.re_pattern.call(null,[cljs.core.str("["),cljs.core.str(thing),cljs.core.str("]")].join(''))], null));var c = cljs.core.nth.call(null,vec__9515,0,null);var end = cljs.core.nth.call(null,vec__9515,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [end,loc], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,lt.objs.editor.adjust_loc.call(null,end,1)], null);
}
});
lt.plugins.paredit.string_bounds = (function string_bounds(ed,loc,dir){return lt.plugins.paredit.escaped_paired_scan.call(null,ed,loc,"\"",dir);
});
lt.plugins.paredit.token_bounds = (function token_bounds(ed,loc,dir){var vec__9517 = lt.plugins.paredit.paired_scan.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dir","dir",1014003711),dir,new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.adjust_loc.call(null,loc,((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?-1:1)),new cljs.core.Keyword(null,"for","for",1014005819),/[\s\)\}\]\"\(\{\[]/], null));var c = cljs.core.nth.call(null,vec__9517,0,null);var end = cljs.core.nth.call(null,vec__9517,1,null);if(cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lt.objs.editor.adjust_loc.call(null,end,1),loc], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [loc,end], null);
}
});
lt.plugins.paredit.first_non_whitespace = (function first_non_whitespace(opts){return lt.plugins.paredit.scan.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"regex","regex",1122296761),/\S/));
});
lt.plugins.paredit.anchored_move = (function anchored_move(ed,loc,anchor_side,dir){var vec__9520 = lt.plugins.paredit.form_boundary.call(null,ed,loc);var start = cljs.core.nth.call(null,vec__9520,0,null);var end = cljs.core.nth.call(null,vec__9520,1,null);var ends = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?lt.plugins.paredit.form_start:lt.plugins.paredit.form_end);var point = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"left","left",1017222009),anchor_side))?start:end);var vec__9521 = lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], null));var cur = cljs.core.nth.call(null,vec__9521,0,null);var i = cljs.core.nth.call(null,vec__9521,1,null);var next = (cljs.core.truth_(cur)?(cljs.core.truth_(cljs.core.re_seq.call(null,ends,cur))?null:(cljs.core.truth_(lt.plugins.paredit.opposites.call(null,cur))?(function (){var right_QMARK_ = cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014));var bounds = lt.plugins.paredit.form_boundary.call(null,ed,((right_QMARK_)?lt.plugins.paredit.move_loc.call(null,ed,i,dir):i));if(right_QMARK_)
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,bounds),lt.objs.editor.adjust_loc.call(null,cljs.core.second.call(null,bounds),1)], null);
} else
{return bounds;
}
})():((cljs.core._EQ_.call(null,"\"",cur))?lt.plugins.paredit.string_bounds.call(null,ed,i,dir):((new cljs.core.Keyword(null,"else","else",1017020587))?lt.plugins.paredit.token_bounds.call(null,ed,i,dir):null)))):null);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"point","point",1120749826),point,new cljs.core.Keyword(null,"boundary","boundary",3193559964),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start,end], null),new cljs.core.Keyword(null,"next","next",1017282149),next], null);
});
lt.plugins.paredit.grow = (function grow(p__9522,dir){var map__9525 = p__9522;var map__9525__$1 = ((cljs.core.seq_QMARK_.call(null,map__9525))?cljs.core.apply.call(null,cljs.core.hash_map,map__9525):map__9525);var orig = map__9525__$1;var loc = cljs.core.get.call(null,map__9525__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9525__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var map__9526 = lt.plugins.paredit.anchored_move.call(null,ed,loc,dir,dir);var map__9526__$1 = ((cljs.core.seq_QMARK_.call(null,map__9526))?cljs.core.apply.call(null,cljs.core.hash_map,map__9526):map__9526);var boundary = cljs.core.get.call(null,map__9526__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__9526__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__9526__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.first.call(null,next):cljs.core.second.call(null,next));if(cljs.core.truth_(neue_point))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point], null));
} else
{return orig;
}
});
lt.plugins.paredit.shrink = (function shrink(p__9527,anchor_side){var map__9531 = p__9527;var map__9531__$1 = ((cljs.core.seq_QMARK_.call(null,map__9531))?cljs.core.apply.call(null,cljs.core.hash_map,map__9531):map__9531);var orig = map__9531__$1;var loc = cljs.core.get.call(null,map__9531__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9531__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var dir = lt.plugins.paredit.dir_swap.call(null,anchor_side);var map__9532 = lt.plugins.paredit.anchored_move.call(null,ed,loc,anchor_side,dir);var map__9532__$1 = ((cljs.core.seq_QMARK_.call(null,map__9532))?cljs.core.apply.call(null,cljs.core.hash_map,map__9532):map__9532);var anchor_move = map__9532__$1;var boundary = cljs.core.get.call(null,map__9532__$1,new cljs.core.Keyword(null,"boundary","boundary",3193559964));var point = cljs.core.get.call(null,map__9532__$1,new cljs.core.Keyword(null,"point","point",1120749826));var next = cljs.core.get.call(null,map__9532__$1,new cljs.core.Keyword(null,"next","next",1017282149));var format_side = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014)))?cljs.core.second.call(null,boundary):cljs.core.first.call(null,boundary));var neue_point = ((cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"left","left",1017222009)))?cljs.core.second.call(null,next):cljs.core.first.call(null,next));var vec__9533 = (cljs.core.truth_(neue_point)?lt.plugins.paredit.first_non_whitespace.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.plugins.paredit.move_loc.call(null,ed,neue_point,dir),new cljs.core.Keyword(null,"dir","dir",1014003711),dir], null)):null);var _ = cljs.core.nth.call(null,vec__9533,0,null);var neue_point__$1 = cljs.core.nth.call(null,vec__9533,1,null);var neue_point__$2 = (cljs.core.truth_((function (){var and__7788__auto__ = neue_point__$1;if(cljs.core.truth_(and__7788__auto__))
{return cljs.core._EQ_.call(null,anchor_side,new cljs.core.Keyword(null,"right","right",1122416014));
} else
{return and__7788__auto__;
}
})())?lt.objs.editor.adjust_loc.call(null,neue_point__$1,1):neue_point__$1);if(cljs.core.truth_(neue_point__$2))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"move","move",1017261891),new cljs.core.Keyword(null,"from","from",1017056028),point,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),loc,new cljs.core.Keyword(null,"to","to",1013907949),loc], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"format","format",4040092521),new cljs.core.Keyword(null,"from","from",1017056028),format_side,new cljs.core.Keyword(null,"to","to",1013907949),neue_point__$2], null));
} else
{return orig;
}
});
lt.plugins.paredit.select = (function select(p__9534,type){var map__9537 = p__9534;var map__9537__$1 = ((cljs.core.seq_QMARK_.call(null,map__9537))?cljs.core.apply.call(null,cljs.core.hash_map,map__9537):map__9537);var orig = map__9537__$1;var loc = cljs.core.get.call(null,map__9537__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9537__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9538 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__9538,0,null);var end = cljs.core.nth.call(null,vec__9538,1,null);if(cljs.core.truth_((function (){var and__7788__auto__ = start;if(cljs.core.truth_(and__7788__auto__))
{return end;
} else
{return and__7788__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null));
} else
{return orig;
}
});
lt.plugins.paredit.unwrap = (function unwrap(p__9539,type){var map__9542 = p__9539;var map__9542__$1 = ((cljs.core.seq_QMARK_.call(null,map__9542))?cljs.core.apply.call(null,cljs.core.hash_map,map__9542):map__9542);var orig = map__9542__$1;var loc = cljs.core.get.call(null,map__9542__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9542__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9543 = lt.plugins.paredit.form_boundary.call(null,ed,loc,(cljs.core.truth_(type)?cljs.core.re_pattern.call(null,[cljs.core.str("[\\"),cljs.core.str(type),cljs.core.str("]")].join('')):null));var start = cljs.core.nth.call(null,vec__9543,0,null);var end = cljs.core.nth.call(null,vec__9543,1,null);if(cljs.core.truth_((function (){var and__7788__auto__ = start;if(cljs.core.truth_(and__7788__auto__))
{return end;
} else
{return and__7788__auto__;
}
})()))
{return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),end,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,end,1)], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),start,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,start,1)], null));
} else
{return orig;
}
});
lt.plugins.paredit.batched_edits = (function batched_edits(p__9544){var map__9550 = p__9544;var map__9550__$1 = ((cljs.core.seq_QMARK_.call(null,map__9550))?cljs.core.apply.call(null,cljs.core.hash_map,map__9550):map__9550);var ed = cljs.core.get.call(null,map__9550__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var edits = cljs.core.get.call(null,map__9550__$1,new cljs.core.Keyword(null,"edits","edits",1110263579));return lt.objs.editor.operation.call(null,ed,(function (){var seq__9551 = cljs.core.seq.call(null,edits);var chunk__9552 = null;var count__9553 = 0;var i__9554 = 0;while(true){
if((i__9554 < count__9553))
{var e = cljs.core._nth.call(null,chunk__9552,i__9554);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__9570 = seq__9551;
var G__9571 = chunk__9552;
var G__9572 = count__9553;
var G__9573 = (i__9554 + 1);
seq__9551 = G__9570;
chunk__9552 = G__9571;
count__9553 = G__9572;
i__9554 = G__9573;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9551);if(temp__4092__auto__)
{var seq__9551__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9551__$1))
{var c__8542__auto__ = cljs.core.chunk_first.call(null,seq__9551__$1);{
var G__9574 = cljs.core.chunk_rest.call(null,seq__9551__$1);
var G__9575 = c__8542__auto__;
var G__9576 = cljs.core.count.call(null,c__8542__auto__);
var G__9577 = 0;
seq__9551 = G__9574;
chunk__9552 = G__9575;
count__9553 = G__9576;
i__9554 = G__9577;
continue;
}
} else
{var e = cljs.core.first.call(null,seq__9551__$1);lt.plugins.paredit.do_edit.call(null,e,ed);
{
var G__9578 = cljs.core.next.call(null,seq__9551__$1);
var G__9579 = null;
var G__9580 = 0;
var G__9581 = 0;
seq__9551 = G__9578;
chunk__9552 = G__9579;
count__9553 = G__9580;
i__9554 = G__9581;
continue;
}
}
} else
{return null;
}
}
break;
}
}));
});
lt.plugins.paredit.do_edit = (function (){var method_table__8652__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__8653__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__8654__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__8655__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__8656__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("do-edit",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__8656__auto__,method_table__8652__auto__,prefer_table__8653__auto__,method_cache__8654__auto__,cached_hierarchy__8655__auto__));
})();
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"move","move",1017261891),(function (p__9555,ed){var map__9556 = p__9555;var map__9556__$1 = ((cljs.core.seq_QMARK_.call(null,map__9556))?cljs.core.apply.call(null,cljs.core.hash_map,map__9556):map__9556);var to = cljs.core.get.call(null,map__9556__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9556__$1,new cljs.core.Keyword(null,"from","from",1017056028));var text = lt.objs.editor.range.call(null,ed,from,lt.objs.editor.adjust_loc.call(null,from,1));if(lt.plugins.paredit.loc_GT_loc.call(null,to,from))
{lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], null),ed);
return lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], null),ed);
} else
{lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"delete","delete",3973413149),new cljs.core.Keyword(null,"from","from",1017056028),from,new cljs.core.Keyword(null,"to","to",1013907949),lt.objs.editor.adjust_loc.call(null,from,1)], null),ed);
return lt.plugins.paredit.do_edit.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"insert","insert",4125079083),new cljs.core.Keyword(null,"from","from",1017056028),to,new cljs.core.Keyword(null,"text","text",1017460895),text], null),ed);
}
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"insert","insert",4125079083),(function (p__9557,ed){var map__9558 = p__9557;var map__9558__$1 = ((cljs.core.seq_QMARK_.call(null,map__9558))?cljs.core.apply.call(null,cljs.core.hash_map,map__9558):map__9558);var text = cljs.core.get.call(null,map__9558__$1,new cljs.core.Keyword(null,"text","text",1017460895));var from = cljs.core.get.call(null,map__9558__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,text);
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"delete","delete",3973413149),(function (p__9559,ed){var map__9560 = p__9559;var map__9560__$1 = ((cljs.core.seq_QMARK_.call(null,map__9560))?cljs.core.apply.call(null,cljs.core.hash_map,map__9560):map__9560);var to = cljs.core.get.call(null,map__9560__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9560__$1,new cljs.core.Keyword(null,"from","from",1017056028));return lt.objs.editor.replace.call(null,ed,from,to,"");
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"cursor","cursor",3959752392),(function (p__9561,ed){var map__9562 = p__9561;var map__9562__$1 = ((cljs.core.seq_QMARK_.call(null,map__9562))?cljs.core.apply.call(null,cljs.core.hash_map,map__9562):map__9562);var to = cljs.core.get.call(null,map__9562__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9562__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(cljs.core._EQ_.call(null,from,to))
{return lt.objs.editor.move_cursor.call(null,ed,to);
} else
{return lt.objs.editor.set_selection.call(null,ed,from,to);
}
}));
cljs.core._add_method.call(null,lt.plugins.paredit.do_edit,new cljs.core.Keyword(null,"format","format",4040092521),(function (p__9563,ed){var map__9564 = p__9563;var map__9564__$1 = ((cljs.core.seq_QMARK_.call(null,map__9564))?cljs.core.apply.call(null,cljs.core.hash_map,map__9564):map__9564);var to = cljs.core.get.call(null,map__9564__$1,new cljs.core.Keyword(null,"to","to",1013907949));var from = cljs.core.get.call(null,map__9564__$1,new cljs.core.Keyword(null,"from","from",1017056028));if(lt.plugins.paredit.loc_GT_loc.call(null,to,from))
{return lt.objs.editor.indent_lines.call(null,ed,from,to,"smart");
} else
{return lt.objs.editor.indent_lines.call(null,ed,to,from,"smart");
}
}));
lt.plugins.paredit.ed__GT_info = (function ed__GT_info(ed){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),lt.objs.editor.__GT_cursor.call(null,ed),new cljs.core.Keyword(null,"edits","edits",1110263579),cljs.core.PersistentVector.EMPTY], null);
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.grow.right","paredit.grow.right",1170264982),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Grow right",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.grow.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.grow.left","paredit.grow.left",1988596849),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Grow left",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.grow.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.shrink.right","paredit.shrink.right",2805555276),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Shrink right",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.shrink.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"right","right",1122416014)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.shrink.left","paredit.shrink.left",4396652795),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Shrink left",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.shrink.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Select expression",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__7800__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__7800__auto__)
{return or__7800__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.select.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),type));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.unwrap.parent","paredit.unwrap.parent",826624900),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Unwrap parent. e.g. (a b c) => a b c",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__7800__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__7800__auto__)
{return or__7800__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.paredit.unwrap.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),type));
} else
{return null;
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"paredit.select.clear","paredit.select.clear",1113194800),new cljs.core.Keyword(null,"desc","desc",1016984067),"Paredit: Clear selection and return cursor",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"editor.selection.clear","editor.selection.clear",1854878812));
if(cljs.core.truth_(new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))))
{lt.objs.editor.move_cursor.call(null,ed,new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));
return lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.paredit","orig-pos","lt.plugins.paredit/orig-pos",1406198178),null], null));
} else
{return null;
}
} else
{return null;
}
})], null));
}

//# sourceMappingURL=paredit_compiled.js.map