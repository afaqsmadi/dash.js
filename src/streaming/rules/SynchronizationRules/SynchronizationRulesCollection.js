/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

import FactoryMaker from '../../../core/FactoryMaker.js';
import TimelineConverter from '../../../dash/TimelineConverter.js';
import LiveEdgeBinarySearchRule from './LiveEdgeBinarySearchRule.js';
import LiveEdgeWithTimeSynchronizationRule from './LiveEdgeWithTimeSynchronizationRule.js';
import DashAdapter from '../../../dash/DashAdapter.js';


const TIME_SYNCHRONIZED_RULES = 'withAccurateTimeSourceRules';
const BEST_GUESS_RULES = 'bestGuestRules';

function SynchronizationRulesCollection() {

    let context = this.context;

    let instance,
        withAccurateTimeSourceRules,
        bestGuestRules;

    function initialize() {
        withAccurateTimeSourceRules = [];
        bestGuestRules = [];

        withAccurateTimeSourceRules.push(LiveEdgeWithTimeSynchronizationRule(context).create({
            timelineConverter: TimelineConverter(context).getInstance()
        }));

        bestGuestRules.push(LiveEdgeBinarySearchRule(context).create({
            timelineConverter: TimelineConverter(context).getInstance(),
            adapter: DashAdapter(context).getInstance()
        }));
    }

    function getRules(type) {
        switch (type) {
            case TIME_SYNCHRONIZED_RULES:
                return withAccurateTimeSourceRules;
            case BEST_GUESS_RULES:
                return bestGuestRules;
            default:
                return null;
        }
    }

    instance = {
        initialize: initialize,
        getRules: getRules
    };

    return instance;
}

SynchronizationRulesCollection.__dashjs_factory_name = "SynchronizationRulesCollection";
let factory = FactoryMaker.getSingletonFactory(SynchronizationRulesCollection);
factory.TIME_SYNCHRONIZED_RULES = TIME_SYNCHRONIZED_RULES;
factory.BEST_GUESS_RULES = BEST_GUESS_RULES;
export default factory;